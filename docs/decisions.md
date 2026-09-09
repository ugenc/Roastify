# Roastify — decision log

## 2026-09-09 — Frontend before services

**Decision:** ship the local fixture-driven experience before any AI or persistence. **Reason:** validate the designer workflow, content hierarchy, and export cheaply. **Tradeoff:** custom images receive no analysis and work is lost on refresh.

## 2026-09-09 — Five fixed needs

**Decision:** Maya, Leo, Priya, Sam, and Alex each contribute a like, concern, and question. **Reason:** the user expanded the original three-perspective concept to five. **Tradeoff:** more content to scan; grouping and person filters contain the complexity.

## 2026-09-09 — Honest sample semantics

**Decision:** author 15 comments about the bundled Little Studio design. For custom uploads, label comments as describing the sample rather than the uploaded image. Preserve this in the report. **Reason:** avoid fabricating evidence about arbitrary screenshots. **Tradeoff:** custom upload demonstrates the interaction only.

## 2026-09-09 — Bright identity, neutral report

**Decision:** violet/yellow accents, five original SVG portraits, Space Grotesk + DM Sans, and quiet comment surfaces. Reports use a neutral editorial layout. **Reason:** meet the playful visual brief while keeping critique and exports legible. All assets and fonts are local.

## 2026-09-09 — Source-owned UI and integrated framework

**Decision:** Next.js, React, TypeScript, Tailwind and a customized shadcn/ui-compatible Button using Radix Slot/CVA. **Reason:** visual ownership now and a small server endpoint later within the same project. **Tradeoff:** customized UI code is maintained in this repository.

## 2026-09-09 — Print-first export

**Decision:** browser printing with a dedicated report layout. **Reason:** professional sharing without a document-generation service. **Tradeoff:** browser print settings can affect margins and pagination; exact cross-browser PDF output is not promised.

## Deferred

AI provider/model, usage controls, persistence technology, authentication, public sharing, and deployment. Do not add these while iterating on the frontend without a corresponding scope decision.

## 2026-09-09 — Local testing and print verification

Seven browser tests pass, along with lint, TypeScript, and production build. Inspected desktop/mobile views and every page of the three-page sample report. The notes-only report uses a smaller print image to avoid a lone footer page. Next.js development permits the loopback origin 127.0.0.1 for local tests. A polling watcher avoids this machine’s file-descriptor limit; restart the dev server if edits are not picked up. No public deployment was performed.
