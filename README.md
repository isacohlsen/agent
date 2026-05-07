# Golf Swing Coach — Driftsättningsguide

## Vad som finns i mappen
```
golf-coach/
├── index.html      ← Webbappen (frontend)
├── api/
│   └── analyze.js  ← Backend (proxar till Gemini API)
├── vercel.json     ← Vercel-konfiguration
└── README.md       ← Den här filen
```

---

## Steg 1 — Skapa ett GitHub-konto (om du inte har ett)
Gå till https://github.com och skapa ett gratis konto.

## Steg 2 — Ladda upp projektet till GitHub
1. Gå till https://github.com/new
2. Namnge repot t.ex. `golf-coach`
3. Klicka "Create repository"
4. Välj "uploading an existing file"
5. Ladda upp alla filer: `index.html`, `api/analyze.js`, `vercel.json`
   - OBS: skapa mappen `api` och lägg `analyze.js` inuti den

## Steg 3 — Skapa ett Vercel-konto
Gå till https://vercel.com och logga in med ditt GitHub-konto.

## Steg 4 — Importera projektet i Vercel
1. Klicka "Add New Project"
2. Välj ditt `golf-coach` repo
3. Klicka "Deploy"

## Steg 5 — Lägg till din Gemini API-nyckel
1. I Vercel, gå till ditt projekt → Settings → Environment Variables
2. Lägg till:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** din nyckel från Google AI Studio (börjar med AIza...)
3. Klicka Save
4. Gå till Deployments → klicka på de tre prickarna → "Redeploy"

## Steg 6 — Dela med din kompis
Du får en URL som ser ut ungefär så här:
`https://golf-coach-xxx.vercel.app`

Skicka den till din kompis — klart!

---

## Uppdatera coachningsdokumentet
All coachningsfilosofi ligger i `index.html` i variabeln `COACHING_DOC`.
Öppna filen i en textredigerare, redigera texten, ladda upp på nytt till GitHub
så uppdateras appen automatiskt.

## Gratis-tier på Gemini
Gemini Flash ger 1500 gratis förfrågningar per dag — mer än nog för att testa.
Om ni behöver mer kan ni lägga till betalning i Google AI Studio.
