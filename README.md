# Roastify

A colorful, frontend-only design critique demo. Five fictional perspectives, fifteen sample comments, local image preview, and a curated printable report.

## Run locally

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000 and choose **Try an example** to explore the complete sample flow. If macOS reports `EMFILE` watcher errors, run `WATCHPACK_POLLING=true npm run dev`.

## Verify

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

The browser tests use a development server on port 3001 and exercise the development-only retry scenario. If the environment uses a custom Playwright browser cache, set `PLAYWRIGHT_BROWSERS_PATH` to that directory for installation and tests. The implementation session used `/private/tmp/roastify-playwright`.

For a production preview, run `npm run build` and then `npm start`.

## Important behavior

- All comments are authored examples about the bundled Little Studio sample.
- Custom images stay in browser memory and are not analyzed or transmitted.
- No API keys, accounts, database, or local storage are needed.
- Refresh resets the session. Export the report using **Print / Save as PDF**.
- `/?demoError=1` simulates the first review failure in development only.

Start with [plan.md](plan.md). Product details, the frontend plan, and dated decisions are in [docs](docs/).
