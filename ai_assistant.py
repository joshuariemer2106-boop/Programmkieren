import json
import re
import sys


TOPIC_KEYWORDS = {
    "HTML": {"html", "tag", "doctype", "head", "body", "form", "link", "list", "semantic", "h1", "p"},
    "CSS": {"css", "selector", "grid", "flexbox", "style", "layout", "responsive"},
    "JavaScript": {"javascript", "js", "dom", "event", "function", "array", "object"},
    "SQL": {"sql", "select", "join", "where", "database", "query"},
    "Python": {"python", "dict", "list", "loop", "function", "class"},
}


def tokenize(text):
    return [part for part in re.split(r"[^a-zA-Z0-9äöüÄÖÜß]+", text.lower()) if part]


def detect_topic(query, results):
    bag = set(tokenize(query))
    for item in results[:6]:
        bag.update(tokenize(item.get("title", "")))
        bag.update(tokenize(item.get("url", "")))

    best_topic = "Web Development"
    best_score = 0
    for topic, keywords in TOPIC_KEYWORDS.items():
        score = len(bag.intersection(keywords))
        if score > best_score:
            best_score = score
            best_topic = topic
    return best_topic


def explanation_for_topic(topic, query):
    if topic == "HTML":
        return f"Deine Frage '{query}' passt zu HTML-Grundlagen und Seitenstruktur. Achte zuerst auf saubere Tags und sinnvolle Dokumentstruktur."
    if topic == "CSS":
        return f"Deine Frage '{query}' passt zu CSS-Styling und Layout. Starte mit den zentralen Eigenschaften und pruefe jede Aenderung direkt im Browser."
    if topic == "JavaScript":
        return f"Deine Frage '{query}' passt zu JavaScript-Logik. Wichtig ist, DOM-Zugriffe und Events zuerst in kleinen, testbaren Schritten aufzubauen."
    if topic == "SQL":
        return f"Deine Frage '{query}' passt zu SQL-Abfragen. Arbeite zuerst mit einfachen SELECT-Abfragen und erweitere dann schrittweise mit WHERE und JOIN."
    if topic == "Python":
        return f"Deine Frage '{query}' passt zu Python-Basics. Fokus auf klare Funktionen, Datentypen und kurze testbare Codebeispiele."
    return f"Deine Frage '{query}' passt zu Webentwicklung. Arbeite mit kleinen Lernschritten und pruefe jeden Schritt sofort."


def build_learning_steps(results):
    steps = []
    for idx, item in enumerate(results[:3], start=1):
        title = item.get("title") or "W3Schools Seite"
        url = item.get("url") or "https://www.w3schools.com/"
        steps.append(f"{idx}. Lies zuerst '{title}' und uebernimm ein Beispiel in dein Projekt: {url}")

    while len(steps) < 3:
        n = len(steps) + 1
        steps.append(f"{n}. Baue ein kleines Beispiel, teste es lokal und notiere, was sich aendert.")
    return steps


def build_answer(query, results):
    topic = detect_topic(query, results)
    intro = explanation_for_topic(topic, query)
    steps = build_learning_steps(results)
    outro = "Wenn ein Schritt unklar bleibt, stelle die naechste Frage enger (z. B. nur ein Tag, eine CSS-Eigenschaft oder ein JS-Event)."
    return f"{intro}\n\nLernpfad:\n" + "\n".join(steps) + f"\n\n{outro}"


def main():
    raw = sys.stdin.read()
    payload = json.loads(raw or "{}")
    query = str(payload.get("query", "")).strip()
    results = payload.get("results") or []
    if not isinstance(results, list):
        results = []

    if len(query) < 2:
        print(json.dumps({"answer": "Bitte eine praezise Frage eingeben.", "source": "python_local"}))
        return

    answer = build_answer(query, results)
    print(json.dumps({"answer": answer, "source": "python_local"}, ensure_ascii=True))


if __name__ == "__main__":
    main()
