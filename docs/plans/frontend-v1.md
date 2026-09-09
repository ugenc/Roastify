# Frontend v1 — implementation and acceptance

## Flow

1. **Choose a design:** click or drop one PNG/JPG, validate type/size/decode, preview and replace/remove. The bundled sample supplies image, audience, and task.
2. **Reveal examples:** require a nonempty brief. A short async fixture adapter shows a loading state; the interface says that the feedback is prewritten and no image leaves the browser.
3. **Explore:** all five people initially; group comments by Likes / Concerns / Questions. Each card identifies the person and element, gives the reaction, and reveals a suggested next step. Individual filters explain the selected person's reason to care.
4. **Curate:** all findings initially retained. Dismiss/undo is reversible. Add a designer note and next steps. Report selection is independent of the active person filter.
5. **Export:** report preview includes date, brief, image, all persona needs, selected comments, notes, and explicit fictional/example labels. Browser Print / Save as PDF uses dedicated print styles. An empty selection still permits a notes-only report.

Back navigation preserves selections and notes. Changing the image or source brief clears stale feedback; starting a new review clears the session. Refresh resets all user state.

## Design

Paper #FAFAFF, ink #202033, violet #6941F5, yellow #FFE45C, coral #FF806C, mint #9DE8CE. Space Grotesk headings, DM Sans body. Illustrated cast badges, clear columns, rounded panels, restrained outlines/shadows, bright accents. Desktop screenshot sidebar; stacked mobile sections and horizontally scrollable persona filters. Respect reduced motion and expose keyboard focus.

## Architecture

- `app/page.tsx` owns the in-memory review flow and browser-only file preview.
- `lib/review.ts` defines Persona, Finding, ReviewBrief, and Review; `generateReview` returns a fresh fixture after a short delay.
- `components/avatar.tsx` contains original vector portraits. `public/sample-design.svg` contains the original fictional workshop UI.
- `components/ui/button.tsx` is a customized shadcn/ui-compatible source-owned button. Tailwind and shared CSS tokens style the app.
- Blob URLs are revoked on replacement/removal; concurrent decoding is guarded so older selections cannot overwrite newer ones.
- No API route or database abstraction is added before it is needed.

## Verification

`npm run lint`, `npm run typecheck`, `npm run build`, and `npm test`.

Browser tests cover the sample flow and five-by-three grouping; filtering; dismissal and restoration; note retention and report counts; invalid, oversized, and unreadable images; replacement; custom-image disclosures; absence of upload requests; refresh reset; empty reports; print visibility; simulated failure/retry; mobile overflow; keyboard activation; removal; and required brief fields.

Visually inspect the landing page, sample preview, feedback at desktop and mobile widths, and every page of generated sample and empty-selection PDFs. Test artifacts live in ignored `test-results/`.

## Error demonstration

In development only, open `/?demoError=1` and run an example. The first request fails intentionally; retry succeeds without losing the brief. Production has no simulation controls or forced failure mode.
