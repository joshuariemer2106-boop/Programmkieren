const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { URL } = require("url");

function loadEnvFile() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const equalIndex = trimmed.indexOf("=");
    if (equalIndex === -1) {
      continue;
    }
    const key = trimmed.slice(0, equalIndex).trim();
    const value = trimmed.slice(equalIndex + 1).trim();
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const PORT = Number(process.env.PORT || 3000);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon"
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => resolve(raw));
    req.on("error", reject);
  });
}

function decodeBasicEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'");
}

function decodeDuckDuckGoRedirect(url) {
  try {
    const parsed = new URL(url, "https://duckduckgo.com");
    const redirected = parsed.searchParams.get("uddg");
    return redirected ? decodeURIComponent(redirected) : "";
  } catch {
    return "";
  }
}

function normalizeWords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9äöüß\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function scoreUrl(url, words) {
  const lower = url.toLowerCase();
  let score = 0;
  for (const word of words) {
    if (lower.includes(`/${word}`) || lower.includes(`${word}.`)) {
      score += 3;
    } else if (lower.includes(word)) {
      score += 1;
    }
  }
  return score;
}

function titleFromUrl(url) {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    const raw = parts[parts.length - 1] || "W3Schools";
    return raw
      .replace(/\.asp$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  } catch {
    return url;
  }
}

async function fetchLinksFromPage(pageUrl) {
  const response = await fetch(pageUrl, {
    headers: {
      "User-Agent": "CodeJourneyBot/1.0 (+https://www.w3schools.com)"
    }
  });
  if (!response.ok) {
    return [];
  }

  const html = await response.text();
  const linkRegex = /<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  const links = [];

  for (const match of html.matchAll(linkRegex)) {
    const href = (match[1] || "").trim();
    const text = decodeBasicEntities((match[2] || ""))
      .replaceAll(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
      continue;
    }

    let absolute = "";
    try {
      absolute = new URL(href, pageUrl).toString();
    } catch {
      continue;
    }
    if (!absolute.includes("w3schools.com")) {
      continue;
    }
    links.push({ title: text || titleFromUrl(absolute), url: absolute });
  }

  return links;
}

async function searchW3schools(query) {
  const searchUrl = `https://duckduckgo.com/html/?q=${encodeURIComponent(`site:w3schools.com ${query}`)}`;
  const response = await fetch(searchUrl, {
    headers: {
      "User-Agent": "CodeJourneyBot/1.0 (+https://www.w3schools.com)"
    }
  });

  if (!response.ok) {
    throw new Error(`Search failed with status ${response.status}`);
  }

  const html = await response.text();
  const resultRegex =
    /<a[^>]*class="[^"]*result__a[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;

  const results = [];
  for (const match of html.matchAll(resultRegex)) {
    const rawHref = match[1] || "";
    const title = decodeBasicEntities((match[2] || ""))
      .replaceAll(/<[^>]+>/g, "")
      .trim();
    const url = decodeDuckDuckGoRedirect(rawHref) || rawHref;
    if (!url.includes("w3schools.com")) {
      continue;
    }
    if (results.some((item) => item.url === url)) {
      continue;
    }
    results.push({ title, url });
    if (results.length >= 6) {
      break;
    }
  }

  if (results.length > 0) {
    return results;
  }

  return searchW3schoolsByCrawl(query);
}

async function searchW3schoolsByCrawl(query) {
  const words = normalizeWords(query);
  const seedPages = [
    "https://www.w3schools.com/",
    "https://www.w3schools.com/html/default.asp",
    "https://www.w3schools.com/css/default.asp",
    "https://www.w3schools.com/js/default.asp",
    "https://www.w3schools.com/sql/default.asp",
    "https://www.w3schools.com/python/default.asp"
  ];

  const collected = [];
  for (const seed of seedPages) {
    try {
      const links = await fetchLinksFromPage(seed);
      collected.push(...links);
    } catch {
      // Ignore single-seed failures and continue.
    }
  }

  const unique = [];
  for (const item of collected) {
    const url = item.url.split("#")[0];
    if (!url.match(/\/(default|index)?\.asp$|\.asp$/i)) {
      continue;
    }
    if (unique.some((entry) => entry.url === url)) {
      continue;
    }
    unique.push({
      url,
      title: item.title || titleFromUrl(url)
    });
  }

  return unique
    .map((item) => ({ ...item, score: scoreUrl(`${item.url} ${item.title}`, words) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ score, ...item }) => item);
}

function runLocalPythonAssistant(query, results) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), "ai_assistant.py");
    const payload = JSON.stringify({ query, results });
    const child = spawn("python", [scriptPath], { stdio: ["pipe", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("error", (error) => {
      reject(new Error(`Python konnte nicht gestartet werden: ${error.message}`));
    });
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python-Assistant Fehler (exit ${code}): ${stderr.trim() || "Unbekannter Fehler"}`));
        return;
      }

      try {
        const parsed = JSON.parse(stdout || "{}");
        resolve({
          answer: parsed.answer || "Lokale KI hat keine Antwort erzeugt.",
          source: parsed.source || "python_local"
        });
      } catch {
        reject(new Error("Python-Assistant lieferte ungueltiges JSON."));
      }
    });

    child.stdin.write(payload);
    child.stdin.end();
  });
}

async function handleAssistant(req, res) {
  try {
    const rawBody = await readBody(req);
    const body = rawBody ? JSON.parse(rawBody) : {};
    const query = String(body.query || "").trim();

    if (!query || query.length < 2) {
      sendJson(res, 400, { error: "Bitte eine laengere Suchanfrage senden." });
      return;
    }

    const results = await searchW3schools(query);
    const summary = await runLocalPythonAssistant(query, results);

    sendJson(res, 200, {
      query,
      results,
      answer: summary.answer,
      aiSource: summary.source
    });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Interner Serverfehler." });
  }
}

function serveStatic(req, res) {
  const parsed = new URL(req.url, "http://localhost");
  const requestPath = parsed.pathname === "/" ? "/index.html" : parsed.pathname;
  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(process.cwd(), safePath);

  if (!filePath.startsWith(process.cwd())) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/w3schools-assistant") {
    handleAssistant(req, res);
    return;
  }
  if (req.method === "GET") {
    serveStatic(req, res);
    return;
  }
  res.writeHead(405);
  res.end("Method Not Allowed");
});

server.listen(PORT, () => {
  console.log(`CodeJourney server laeuft auf http://localhost:${PORT}`);
});
