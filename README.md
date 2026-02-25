# CodeJourney

Lernplattform-Prototyp, um Programmieren schrittweise zu lernen:

1. Handbuch/Buch zum Nachschlagen
2. Aufgaben und Uebungen pro Kapitel
3. Fortschritt und Freischaltung naechster Sprachen

Aktuell ist HTML komplett als erster Track umgesetzt.
Inhaltliche Referenz fuer Kapitel: W3Schools.
HTML umfasst jetzt 8 Aufgaben (von Grundstruktur bis Mini-Projekt).

## Start

1. Node.js 18+ installieren.
2. Python 3 installieren (`python --version`).
3. Optional `.env.example` nach `.env` kopieren (nur `PORT`).
4. `npm start` im Projektordner ausfuehren.
5. `http://localhost:3000` im Browser oeffnen.
6. Kapitel im Handbuch waehlen.
7. Optional im Handbuch eine Frage in `KI fragen` eingeben.
8. Aufgabe im Editor loesen.
9. `Vorschau` und danach `Aufgabe pruefen` klicken.

## Online mit Render

1. Projekt zu GitHub pushen.
2. Auf Render `New +` -> `Blueprint` waehlen.
3. GitHub-Repo verbinden und `render.yaml` verwenden.
4. Deploy starten.
5. Nach dem Deploy die URL oeffnen (`https://<dein-name>.onrender.com`).

## Was schon funktioniert

- Lernpfad mit gesperrten/freien Sprachen
- HTML-Handbuch laedt Kapitel direkt von W3Schools
- Quellenverweise pro Kapitel auf W3Schools
- Interaktive Uebungen mit automatischer Pruefung
- Fortschrittsanzeige fuer den HTML-Track
- CSS-Track wird nach Abschluss von HTML freigeschaltet
- KI-Suche: lokale Python-KI erstellt Antworten auf Basis von W3Schools-Treffern (ohne OpenAI-Kosten)
- VS-Code-Editor im Browser (Monaco) mit Syntax Highlighting und VS Code Web Shortcut

## Geplanter Ausbau

- CSS-Track mit eigenen Kapiteln + Checker
- JavaScript-Track mit DOM-Aufgaben
- Python- und SQL-Track als weitere Module
- Nutzerprofil + Speicherung des Fortschritts (LocalStorage/Backend)
