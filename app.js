const TRACKS = [
  {
    id: "html",
    title: "HTML Grundlagen",
    state: "active",
    chapters: [
      {
        id: "html-1",
        title: "1. Grundstruktur",
        source: "https://www.w3schools.com/html/html_basic.asp",
        handbook: [
          "HTML beginnt mit <!doctype html>, damit der Browser den modernen Standard nutzt.",
          "Das <html>-Element umschliesst die ganze Seite. Mit lang=\"de\" setzt du die Sprache.",
          "Im <head> stehen Metadaten wie <meta charset=\"UTF-8\"> und der <title>.",
          "Im <body> steht alles, was sichtbar ist: Ueberschriften, Texte, Bilder, Listen und mehr.",
          "Wichtige erste Tags: <h1> bis <h6>, <p>, <br>, <hr>."
        ],
        cheat: `<!doctype html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Seitentitel</title>
</head>
<body>
  <h1>Meine Ueberschrift</h1>
  <p>Mein erster Absatz.</p>
</body>
</html>`,
        task: {
          title: "Seite mit Titel und Text",
          description: "Erstelle eine Seite mit genau einer h1 und mindestens einem p.",
          starter:
`<!doctype html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Meine erste Seite</title>
</head>
<body>

</body>
</html>`,
          validate: (doc) => {
            const hasH1 = Boolean(doc.querySelector("h1"));
            const hasP = Boolean(doc.querySelector("p"));
            return hasH1 && hasP
              ? { ok: true, message: "Sehr gut. Struktur vorhanden." }
              : { ok: false, message: "Dir fehlt eine h1 oder ein p." };
          }
        }
      },
      {
        id: "html-4",
        title: "4. Tabellen",
        source: "https://www.w3schools.com/html/html_tables.asp",
        handbook: [
          "Tabellen bestehen aus <table>, Zeilen <tr>, Kopfzellen <th> und Datenzellen <td>.",
          "Nutze <caption> fuer eine kurze Tabellenbeschreibung.",
          "Tabellen sind fuer strukturierte Daten gedacht, nicht fuer Seitenlayout.",
          "Halte die Struktur einfach: Kopfzeile plus klar lesbare Datensaetze.",
          "Mit mehreren Zeilen und Spalten trainierst du sauberes Markup."
        ],
        cheat: `<table>
  <caption>Kursplan</caption>
  <tr><th>Tag</th><th>Thema</th></tr>
  <tr><td>Mo</td><td>HTML</td></tr>
  <tr><td>Di</td><td>CSS</td></tr>
</table>`,
        task: {
          title: "Einfache Datentabelle",
          description: "Erstelle eine Tabelle mit mind. 2 Zeilen, 2 th und 4 td.",
          starter:
`<!doctype html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Tabelle</title>
</head>
<body>
  <h1>Lernplan</h1>

</body>
</html>`,
          validate: (doc) => {
            const thCount = doc.querySelectorAll("table th").length;
            const tdCount = doc.querySelectorAll("table td").length;
            const rowCount = doc.querySelectorAll("table tr").length;
            const ok = thCount >= 2 && tdCount >= 4 && rowCount >= 3;
            return ok
              ? { ok: true, message: "Sauber. Tabelle ist korrekt aufgebaut." }
              : { ok: false, message: "Du brauchst eine Tabelle mit 2 th, 4 td und mindestens 3 tr." };
          }
        }
      },
      {
        id: "html-5",
        title: "5. Formulare",
        source: "https://www.w3schools.com/html/html_forms.asp",
        handbook: [
          "Formulare beginnen mit <form> und enthalten Eingabefelder wie <input>.",
          "Labels (<label>) verbessern Verstaendlichkeit und Barrierefreiheit.",
          "Typische Typen sind text, email und password.",
          "Ein Button mit type='submit' sendet das Formular ab.",
          "Fuer Lernprojekte reicht oft action='#' als Platzhalter."
        ],
        cheat: `<form action="#">
  <label for="name">Name</label>
  <input id="name" type="text" />
  <button type="submit">Senden</button>
</form>`,
        task: {
          title: "Kontaktformular Mini",
          description: "Nutze form, 2 label, 2 input und einen submit Button.",
          starter:
`<!doctype html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Formular</title>
</head>
<body>
  <h1>Kontakt</h1>

</body>
</html>`,
          validate: (doc) => {
            const hasForm = Boolean(doc.querySelector("form"));
            const labels = doc.querySelectorAll("form label").length;
            const inputs = doc.querySelectorAll("form input").length;
            const hasSubmit = Boolean(doc.querySelector("form button[type='submit'], form input[type='submit']"));
            const ok = hasForm && labels >= 2 && inputs >= 2 && hasSubmit;
            return ok
              ? { ok: true, message: "Stark. Formular-Struktur passt." }
              : { ok: false, message: "Du brauchst form + mind. 2 label + 2 input + submit." };
          }
        }
      },
      {
        id: "html-6",
        title: "6. Medien und Alt-Text",
        source: "https://www.w3schools.com/html/html_images.asp",
        handbook: [
          "Bilder werden mit <img> eingebunden.",
          "Das alt-Attribut ist wichtig fuer Screenreader und falls Bilder nicht laden.",
          "Mit <figure> und <figcaption> kannst du Bild und Beschreibung gruppieren.",
          "Sinnvolle Dateinamen und Alt-Texte machen Inhalte besser auffindbar.",
          "Medienelemente sollten inhaltlich zum Abschnitt passen."
        ],
        cheat: `<figure>
  <img src="team.jpg" alt="Team am Whiteboard" />
  <figcaption>Planung im Sprint</figcaption>
</figure>`,
        task: {
          title: "Bild mit Beschreibung",
          description: "Nutze figure, img mit alt und figcaption.",
          starter:
`<!doctype html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Bildbereich</title>
</head>
<body>
  <h1>Projektbild</h1>

</body>
</html>`,
          validate: (doc) => {
            const hasFigure = Boolean(doc.querySelector("figure"));
            const hasImgAlt = Boolean(doc.querySelector("figure img[alt]"));
            const hasCaption = Boolean(doc.querySelector("figure figcaption"));
            const ok = hasFigure && hasImgAlt && hasCaption;
            return ok
              ? { ok: true, message: "Perfekt. Medienbereich ist komplett." }
              : { ok: false, message: "Es fehlen figure, img mit alt oder figcaption." };
          }
        }
      },
      {
        id: "html-7",
        title: "7. Navigation und Anker",
        source: "https://www.w3schools.com/html/html_links_bookmarks.asp",
        handbook: [
          "Mit <nav> baust du eine Navigationsleiste.",
          "Anker-Links springen mit href='#ziel' zu einer Stelle mit id='ziel'.",
          "Kurze, klare Linktexte verbessern die Nutzbarkeit.",
          "Nutze semantische Strukturen wie <section> fuer Inhaltsbereiche.",
          "Interne Navigation ist fuer lange Seiten sehr hilfreich."
        ],
        cheat: `<nav>
  <a href="#start">Start</a>
  <a href="#kontakt">Kontakt</a>
</nav>
<section id="start"><h2>Start</h2></section>
<section id="kontakt"><h2>Kontakt</h2></section>`,
        task: {
          title: "Onepage Navigation",
          description: "Erstelle nav mit 2 internen Links und 2 sections mit IDs.",
          starter:
`<!doctype html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Onepage</title>
</head>
<body>
  <h1>Meine Seite</h1>

</body>
</html>`,
          validate: (doc) => {
            const navLinks = [...doc.querySelectorAll("nav a[href^='#']")];
            const hasTwoNavLinks = navLinks.length >= 2;
            const hasMatchingTargets = navLinks.every((link) => {
              const target = link.getAttribute("href") || "";
              if (!target.startsWith("#")) {
                return false;
              }
              return Boolean(doc.querySelector(target));
            });
            const sections = doc.querySelectorAll("section[id]").length;
            const ok = hasTwoNavLinks && hasMatchingTargets && sections >= 2;
            return ok
              ? { ok: true, message: "Sehr gut. Navigation und Anker funktionieren." }
              : { ok: false, message: "Du brauchst 2 interne nav-Links und 2 section mit passender id." };
          }
        }
      },
      {
        id: "html-8",
        title: "8. Mini-Projekt Profilseite",
        source: "https://www.w3schools.com/html/default.asp",
        handbook: [
          "Eine gute Profilseite kombiniert Struktur, Inhalte und Navigation.",
          "Nutze mindestens header/main/footer fuer klare Semantik.",
          "Baue Liste, Link und Bild mit Alt-Text ein.",
          "Ueberschriften strukturieren Inhalte fuer Leser und Suchmaschinen.",
          "Das Ziel ist ein kleines, aber vollstaendiges HTML-Dokument."
        ],
        cheat: `<header><h1>Mein Profil</h1></header>
<main>
  <p>Ich lerne Webentwicklung.</p>
  <img src="profil.jpg" alt="Profilfoto" />
  <ul><li>HTML</li><li>CSS</li></ul>
  <a href="https://www.w3schools.com">Lernquelle</a>
</main>
<footer>2026</footer>`,
        task: {
          title: "Profilseite komplett",
          description: "Nutze header, main, footer, 1 Bild mit alt, 1 Liste und 1 Link.",
          starter:
`<!doctype html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Profil</title>
</head>
<body>

</body>
</html>`,
          validate: (doc) => {
            const ok =
              Boolean(doc.querySelector("header")) &&
              Boolean(doc.querySelector("main")) &&
              Boolean(doc.querySelector("footer")) &&
              Boolean(doc.querySelector("img[alt]")) &&
              doc.querySelectorAll("ul li").length >= 2 &&
              Boolean(doc.querySelector("a[href]"));
            return ok
              ? { ok: true, message: "Abschluss geschafft. Deine Profilseite ist komplett." }
              : { ok: false, message: "Es fehlen Struktur, Bild mit alt, Liste oder Link." };
          }
        }
      },
      {
        id: "html-2",
        title: "2. Listen und Links",
        source: "https://www.w3schools.com/html/html_lists.asp",
        handbook: [
          "Ungeordnete Listen nutzen <ul> mit mehreren <li>-Eintraegen.",
          "Geordnete Listen nutzen <ol> fuer nummerierte Schritte.",
          "Links werden mit <a href=\"...\"> erstellt.",
          "Externe Links enthalten vollstaendige URLs (https://...).",
          "Fuer Barrierefreiheit sollten Linktexte klar sein, nicht nur 'hier klicken'."
        ],
        cheat: `<ul>
  <li>HTML lernen</li>
  <li>CSS lernen</li>
  <li>JavaScript lernen</li>
</ul>

<a href="https://www.w3schools.com">Zur Quelle</a>`,
        task: {
          title: "Mini Link-Liste",
          description: "Baue eine Liste mit mindestens 3 Punkten und einen Link.",
          starter:
`<!doctype html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Listen</title>
</head>
<body>
  <h1>Meine Links</h1>

</body>
</html>`,
          validate: (doc) => {
            const listItems = doc.querySelectorAll("ul li").length;
            const hasLink = Boolean(doc.querySelector("a[href]"));
            return listItems >= 3 && hasLink
              ? { ok: true, message: "Perfekt. Liste und Link sind korrekt." }
              : { ok: false, message: "Du brauchst mind. 3 li in einer ul und einen a Link." };
          }
        }
      },
      {
        id: "html-3",
        title: "3. Semantische Elemente",
        source: "https://www.w3schools.com/html/html5_semantic_elements.asp",
        handbook: [
          "Semantische Tags beschreiben den Zweck eines Bereichs.",
          "<header> ist fuer Kopfbereich, <main> fuer den Hauptinhalt.",
          "<section> gruppiert thematisch zusammengehoerige Inhalte.",
          "<footer> enthaelt Abschlussinfos wie Copyright oder Kontakt.",
          "Bilder sollten immer ein sinnvolles alt-Attribut besitzen."
        ],
        cheat: `<header><h1>Projektseite</h1></header>
<main>
  <section>
    <h2>Inhalt</h2>
    <p>Beschreibung</p>
    <img src="bild.jpg" alt="Beschreibung des Bildes" />
  </section>
</main>
<footer>Kontakt</footer>`,
        task: {
          title: "Semantisches Seitenlayout",
          description: "Nutze header, main, section, footer und ein img mit alt Text.",
          starter:
`<!doctype html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Semantik</title>
</head>
<body>

</body>
</html>`,
          validate: (doc) => {
            const ok =
              Boolean(doc.querySelector("header")) &&
              Boolean(doc.querySelector("main")) &&
              Boolean(doc.querySelector("section")) &&
              Boolean(doc.querySelector("footer")) &&
              Boolean(doc.querySelector("img[alt]"));
            return ok
              ? { ok: true, message: "Top. Du nutzt semantische Struktur." }
              : { ok: false, message: "Es fehlen semantische Tags oder img alt." };
          }
        }
      }
    ]
  },
  { id: "css", title: "CSS Styling", state: "locked" },
  { id: "js", title: "JavaScript Logik", state: "locked" },
  { id: "python", title: "Python Basics", state: "locked" },
  { id: "sql", title: "SQL Datenbanken", state: "locked" }
];

const W3SCHOOLS_INDEX = [
  { title: "HTML Tutorial", url: "https://www.w3schools.com/html/default.asp", keywords: ["html", "tag", "doctype", "head", "body", "h1", "p"] },
  { title: "HTML Reference", url: "https://www.w3schools.com/tags/default.asp", keywords: ["html", "reference", "tags", "attribute"] },
  { title: "HTML Forms", url: "https://www.w3schools.com/html/html_forms.asp", keywords: ["form", "input", "button", "label"] },
  { title: "HTML Lists", url: "https://www.w3schools.com/html/html_lists.asp", keywords: ["list", "ul", "ol", "li"] },
  { title: "HTML Links", url: "https://www.w3schools.com/html/html_links.asp", keywords: ["link", "a", "href", "anchor"] },
  { title: "HTML Images", url: "https://www.w3schools.com/html/html_images.asp", keywords: ["img", "image", "alt", "picture"] },
  { title: "CSS Tutorial", url: "https://www.w3schools.com/css/default.asp", keywords: ["css", "style", "selector", "class", "id", "layout"] },
  { title: "CSS Reference", url: "https://www.w3schools.com/cssref/index.php", keywords: ["css", "property", "reference"] },
  { title: "CSS Flexbox", url: "https://www.w3schools.com/css/css3_flexbox.asp", keywords: ["flex", "flexbox", "layout"] },
  { title: "CSS Grid", url: "https://www.w3schools.com/css/css_grid.asp", keywords: ["grid", "layout", "rows", "columns"] },
  { title: "JavaScript Tutorial", url: "https://www.w3schools.com/js/default.asp", keywords: ["javascript", "js", "function", "array", "object", "event"] },
  { title: "JavaScript DOM", url: "https://www.w3schools.com/js/js_htmldom.asp", keywords: ["dom", "queryselector", "event", "document"] },
  { title: "JavaScript Reference", url: "https://www.w3schools.com/jsref/default.asp", keywords: ["javascript", "reference", "method"] },
  { title: "SQL Tutorial", url: "https://www.w3schools.com/sql/default.asp", keywords: ["sql", "select", "join", "database", "where"] },
  { title: "SQL Reference", url: "https://www.w3schools.com/sql/sql_ref_keywords.asp", keywords: ["sql", "reference", "keywords"] },
  { title: "Python Tutorial", url: "https://www.w3schools.com/python/default.asp", keywords: ["python", "list", "dict", "loop", "function"] },
  { title: "Python Reference", url: "https://www.w3schools.com/python/python_reference.asp", keywords: ["python", "reference", "method"] }
];

const trackList = document.getElementById("trackList");
const chapterList = document.getElementById("chapterList");
const chapterContent = document.getElementById("chapterContent");
const lessonTitle = document.getElementById("lessonTitle");
const lessonDesc = document.getElementById("lessonDesc");
const editorHost = document.getElementById("editor");
const preview = document.getElementById("preview");
const output = document.getElementById("output");
const runBtn = document.getElementById("runBtn");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");
const openVscodeBtn = document.getElementById("openVscodeBtn");
const openHandbookBtn = document.getElementById("openHandbookBtn");
const closeHandbookBtn = document.getElementById("closeHandbookBtn");
const handbookPanel = document.getElementById("handbookPanel");
const handbookBackdrop = document.getElementById("handbookBackdrop");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const searchInput = document.getElementById("searchInput");
const aiQuestionInput = document.getElementById("aiQuestionInput");
const aiAskBtn = document.getElementById("aiAskBtn");
const aiAssistantResult = document.getElementById("aiAssistantResult");
const trackProgress = document.getElementById("trackProgress");
const progressText = document.getElementById("progressText");

const htmlTrack = TRACKS.find((track) => track.id === "html");
const completedTasks = new Set();
let activeChapterId = htmlTrack.chapters[0].id;
let searchDebounceTimer = null;
let monacoEditor = null;
let isHandbookOpen = false;

function getPreferredTheme() {
  const saved = localStorage.getItem("codejourney-theme");
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.body.setAttribute("data-theme", nextTheme);
  localStorage.setItem("codejourney-theme", nextTheme);
  if (themeToggleBtn) {
    themeToggleBtn.textContent = nextTheme === "dark" ? "Hellmodus" : "Dunkelmodus";
  }
  if (window.monaco) {
    window.monaco.editor.setTheme(nextTheme === "dark" ? "vs-dark" : "vs");
  }
}

function getOrderedChapters() {
  return [...htmlTrack.chapters].sort((a, b) => {
    const aNo = Number((a.id.match(/(\d+)$/) || [0, 0])[1]);
    const bNo = Number((b.id.match(/(\d+)$/) || [0, 0])[1]);
    return aNo - bNo;
  });
}

function getChapter(id) {
  return htmlTrack.chapters.find((chapter) => chapter.id === id);
}

function parseToDocument(source) {
  return new DOMParser().parseFromString(source, "text/html");
}

function writeOutput(message) {
  output.textContent = message;
}

function setHandbookOpen(open) {
  isHandbookOpen = open;
  handbookPanel.classList.toggle("open", open);
  handbookPanel.setAttribute("aria-hidden", open ? "false" : "true");
  handbookBackdrop.hidden = !open;
}

function getEditorValue() {
  if (monacoEditor) {
    return monacoEditor.getValue();
  }
  return editorHost.textContent || "";
}

function setEditorValue(value) {
  if (monacoEditor) {
    monacoEditor.setValue(value);
    return;
  }
  editorHost.textContent = value;
}

function initMonacoEditor() {
  return new Promise((resolve) => {
    if (!window.require) {
      resolve(false);
      return;
    }
    window.require.config({
      paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs"
      }
    });
    window.require(["vs/editor/editor.main"], () => {
      monacoEditor = window.monaco.editor.create(editorHost, {
        value: "",
        language: "html",
        theme: document.body.getAttribute("data-theme") === "dark" ? "vs-dark" : "vs",
        automaticLayout: true,
        minimap: { enabled: true },
        fontSize: 14,
        fontFamily: "IBM Plex Mono, Consolas, monospace",
        roundedSelection: false,
        scrollBeyondLastLine: false
      });
      resolve(true);
    });
  });
}

function normalizeWords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9äöüß\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function scoreResult(queryWords, item) {
  const haystack = `${item.title} ${item.keywords.join(" ")}`.toLowerCase();
  let score = 0;
  for (const word of queryWords) {
    if (item.title.toLowerCase().includes(word)) {
      score += 4;
    } else if (item.keywords.includes(word)) {
      score += 3;
    } else if (haystack.includes(word)) {
      score += 1;
    }
  }
  return score;
}

function getAiSearchResults(query) {
  const queryWords = normalizeWords(query);
  return W3SCHOOLS_INDEX
    .map((item) => ({ ...item, score: scoreResult(queryWords, item) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function buildW3schoolsWebSearchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(`site:w3schools.com ${query}`)}`;
}

async function fetchAssistantResult(query) {
  const response = await fetch("/api/w3schools-assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Serverfehler (${response.status})`);
  }
  return response.json();
}

function renderAiResult(state, payload = {}) {
  aiAssistantResult.innerHTML = "";
  if (state === "idle") {
    aiAssistantResult.textContent = "Stelle eine Frage und erhalte eine kurze KI-Antwort mit passenden W3Schools-Links.";
    return;
  }
  if (state === "loading") {
    aiAssistantResult.textContent = "KI sucht auf W3Schools...";
    return;
  }
  if (state === "error") {
    aiAssistantResult.textContent = payload.message || "KI-Antwort nicht verfuegbar.";
    return;
  }

  const answerBlock = document.createElement("div");
  answerBlock.className = "search-block";
  const answer = document.createElement("p");
  answer.textContent = payload.answer || "Keine KI-Antwort.";
  answerBlock.append(answer);
  aiAssistantResult.append(answerBlock);

  const links = Array.isArray(payload.results) ? payload.results : [];
  for (const result of links) {
    const block = document.createElement("div");
    block.className = "search-block";

    const link = document.createElement("a");
    link.href = result.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = result.title || result.url;
    block.append(link);

    aiAssistantResult.append(block);
  }

  const webSearchLink = document.createElement("a");
  webSearchLink.href = buildW3schoolsWebSearchUrl(payload.query || "");
  webSearchLink.target = "_blank";
  webSearchLink.rel = "noopener noreferrer";
  webSearchLink.textContent = "Alle W3Schools-Webtreffer oeffnen";
  aiAssistantResult.append(webSearchLink);
}

async function askAiAssistant() {
  const query = aiQuestionInput.value.trim();
  if (query.length < 2) {
    renderAiResult("error", { message: "Bitte eine Frage mit mindestens 2 Zeichen eingeben." });
    return;
  }

  renderAiResult("loading");
  aiAskBtn.disabled = true;

  try {
    const aiData = await fetchAssistantResult(query);
    renderAiResult("success", {
      query,
      answer: aiData.answer,
      results: aiData.results
    });
  } catch (error) {
    const fallbackResults = getAiSearchResults(query).map((entry) => ({
      title: `${entry.title} (Fallback)`,
      url: entry.url
    }));
    renderAiResult("success", {
      query,
      answer: `KI-Suche nicht verfuegbar: ${error.message}`,
      results: fallbackResults
    });
  } finally {
    aiAskBtn.disabled = false;
  }
}

function updateProgress() {
  const done = completedTasks.size;
  const total = htmlTrack.chapters.length;
  const percent = Math.round((done / total) * 100);
  trackProgress.value = percent;
  progressText.textContent = `${done} / ${total} Aufgaben geloest`;

  if (done === total) {
    const cssTrack = TRACKS.find((track) => track.id === "css");
    if (cssTrack && cssTrack.state === "locked") {
      cssTrack.state = "active";
      writeOutput("HTML abgeschlossen. CSS wurde freigeschaltet.");
      renderTracks();
    }
  }
}

function renderTracks() {
  trackList.innerHTML = "";
  for (const track of TRACKS) {
    const item = document.createElement("button");
    item.type = "button";
    item.className = `track-item ${track.state}`;
    item.textContent =
      track.state === "locked" ? `${track.title} (gesperrt)` : track.title;
    if (track.id === "html") {
      item.classList.add("selected");
    }
    if (track.state === "locked") {
      item.disabled = true;
    } else if (track.id !== "html") {
      item.addEventListener("click", () => {
        writeOutput("Dieser Track wird als naechster Schritt aufgebaut.");
      });
    }
    trackList.append(item);
  }
}

function renderChapters() {
  chapterList.innerHTML = "";

  for (const chapter of getOrderedChapters()) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chapter-item";
    if (completedTasks.has(chapter.id)) {
      button.classList.add("done");
    }
    if (chapter.id === activeChapterId) {
      button.classList.add("selected");
    }
    button.textContent = chapter.title;
    button.addEventListener("click", () => {
      activeChapterId = chapter.id;
      renderChapters();
      renderChapterContent();
      loadTaskStarter();
    });
    chapterList.append(button);
  }
}

function getNextChapterId(currentId) {
  const ordered = getOrderedChapters();
  const index = ordered.findIndex((chapter) => chapter.id === currentId);
  if (index === -1 || index >= ordered.length - 1) {
    return null;
  }
  return ordered[index + 1].id;
}

function renderChapterContent() {
  const chapter = getChapter(activeChapterId);
  chapterContent.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = chapter.title;
  chapterContent.append(title);

  const note = document.createElement("p");
  note.textContent = "Handbuch-Inhalt in der App (auf Basis der W3Schools-Themen).";
  chapterContent.append(note);

  const theoryLabel = document.createElement("h4");
  theoryLabel.textContent = "Inhalt";
  chapterContent.append(theoryLabel);

  for (const line of chapter.handbook) {
    const p = document.createElement("p");
    p.textContent = line;
    chapterContent.append(p);
  }

  const cheatLabel = document.createElement("h4");
  cheatLabel.textContent = "Beispiel";
  chapterContent.append(cheatLabel);

  const code = document.createElement("code");
  code.textContent = chapter.cheat;
  chapterContent.append(code);

  const sourceLabel = document.createElement("h4");
  sourceLabel.textContent = "Quelle";
  chapterContent.append(sourceLabel);

  const sourceLink = document.createElement("a");
  sourceLink.href = chapter.source;
  sourceLink.target = "_blank";
  sourceLink.rel = "noopener noreferrer";
  sourceLink.textContent = "Original bei W3Schools";
  chapterContent.append(sourceLink);
}

function renderSearchContent(query) {
  const safeQuery = query.trim();
  if (!safeQuery) {
    renderChapterContent();
    return;
  }

  const normalized = safeQuery.toLowerCase();
  const matches = htmlTrack.chapters.filter((chapter) => {
    const text = `${chapter.title} ${chapter.handbook.join(" ")} ${chapter.cheat}`.toLowerCase();
    return text.includes(normalized);
  });

  chapterContent.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = `Suche im Handbuch: ${safeQuery}`;
  chapterContent.append(title);

  const note = document.createElement("p");
  note.textContent = "Ergebnisse aus dem lokalen Handbuch, inhaltlich nach W3Schools-Kapiteln aufgebaut.";
  chapterContent.append(note);

  const localTitle = document.createElement("h4");
  localTitle.textContent = "Lokale Treffer";
  chapterContent.append(localTitle);

  if (matches.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Keine Treffer im aktuellen HTML-Handbuch.";
    chapterContent.append(empty);
  } else {
    for (const chapter of matches) {
      const block = document.createElement("div");
      block.className = "search-block";

      const h4 = document.createElement("h4");
      h4.textContent = chapter.title;
      block.append(h4);

      const p = document.createElement("p");
      p.textContent = chapter.handbook[0];
      block.append(p);

      const a = document.createElement("a");
      a.href = chapter.source;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "W3Schools Quelle";
      block.append(a);

      chapterContent.append(block);
    }
  }
  const webSearchLink = document.createElement("a");
  webSearchLink.href = buildW3schoolsWebSearchUrl(safeQuery);
  webSearchLink.target = "_blank";
  webSearchLink.rel = "noopener noreferrer";
  webSearchLink.textContent = "Websuche auf W3Schools oeffnen";
  chapterContent.append(webSearchLink);
}

function loadTaskStarter() {
  const chapter = getChapter(activeChapterId);
  lessonTitle.textContent = chapter.task.title;
  lessonDesc.textContent = chapter.task.description;
  setEditorValue(chapter.task.starter);
  preview.srcdoc = chapter.task.starter;
  writeOutput("Vorlage geladen. Starte mit Vorschau und pruefe dann die Aufgabe.");
}

function runPreview() {
  preview.srcdoc = getEditorValue();
  writeOutput("Vorschau aktualisiert.");
}

function checkTask() {
  const chapter = getChapter(activeChapterId);
  let result;
  try {
    const doc = parseToDocument(getEditorValue());
    result = chapter.task.validate(doc);
  } catch (error) {
    writeOutput(`Fehler beim Parsen: ${error.message}`);
    return;
  }

  if (result.ok) {
    completedTasks.add(chapter.id);
    updateProgress();
    renderChapters();

    const nextChapterId = getNextChapterId(chapter.id);
    if (nextChapterId && !completedTasks.has(nextChapterId)) {
      activeChapterId = nextChapterId;
      renderChapters();
      renderChapterContent();
      loadTaskStarter();
      writeOutput(`Aufgabe bestanden: ${result.message} Naechste Aufgabe wurde geladen.`);
      return;
    }

    writeOutput(`Aufgabe bestanden: ${result.message}`);
    return;
  }
  writeOutput(`Noch nicht bestanden: ${result.message}`);
}

async function openInVsCodeWeb() {
  const source = getEditorValue();
  try {
    await navigator.clipboard.writeText(source);
    writeOutput("Code kopiert. vscode.dev wird geoeffnet. Fuege den Code dort mit Strg+V ein.");
  } catch {
    writeOutput("vscode.dev wird geoeffnet. Kopiere den Code manuell aus dem Editor.");
  }
  window.open("https://vscode.dev", "_blank", "noopener,noreferrer");
}

runBtn.addEventListener("click", runPreview);
checkBtn.addEventListener("click", checkTask);
resetBtn.addEventListener("click", loadTaskStarter);
openVscodeBtn.addEventListener("click", openInVsCodeWeb);
openHandbookBtn.addEventListener("click", () => setHandbookOpen(true));
closeHandbookBtn.addEventListener("click", () => setHandbookOpen(false));
handbookBackdrop.addEventListener("click", () => setHandbookOpen(false));
themeToggleBtn.addEventListener("click", () => {
  const current = document.body.getAttribute("data-theme") || "light";
  applyTheme(current === "dark" ? "light" : "dark");
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isHandbookOpen) {
    setHandbookOpen(false);
  }
});
searchInput.addEventListener("input", (event) => {
  clearTimeout(searchDebounceTimer);
  const value = event.target.value;
  searchDebounceTimer = setTimeout(() => {
    renderSearchContent(value);
  }, 450);
});
aiAskBtn.addEventListener("click", askAiAssistant);
aiQuestionInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    askAiAssistant();
  }
});

renderTracks();
renderChapters();
renderChapterContent();
applyTheme(getPreferredTheme());
initMonacoEditor().finally(() => {
  loadTaskStarter();
  updateProgress();
  renderAiResult("idle");
  setHandbookOpen(false);
});
