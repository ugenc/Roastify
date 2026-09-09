# Roastify — project plan

## Current milestone: frontend demo

Roastify helps designers turn fictional reactions into useful design questions. Phase 1 uses authored sample feedback, not AI or real user research.

- [x] Next.js, React, TypeScript, Tailwind CSS, and customized shadcn/ui button foundation.
- [x] Bright responsive interface with five illustrated, needs-based fictional personas.
- [x] Local PNG/JPG selection, drag-and-drop, validation, preview, replacement, and removal.
- [x] Bundled Little Studio sample with matching feedback.
- [x] Fifteen findings grouped into likes, concerns, and questions; persona filtering.
- [x] Dismiss/restore findings, designer note, next steps, and report preview.
- [x] Print stylesheet for Save as PDF; demo disclosures remain visible.
- [x] Session-only state, explicit custom-image limitations, and simulated loading/error/retry.
- [x] Complete final browser, responsive, print, lint, type, and production-build checks.

## Next action

Review the running demo together. Collect feedback on clarity, usefulness, and visual design before expanding functionality.

Verified 2026-09-09: lint, TypeScript, and production build passed. All seven Playwright browser tests passed. Desktop/mobile screens and all three sample-report PDF pages were visually inspected. The notes-only report was adjusted and verified as one page. Local preview: http://127.0.0.1:3000.

## Later milestones

1. **Real AI:** choose an image-capable model through sample-design evaluation; add a Next.js server endpoint; validate requests and structured responses; protect API keys and control usage. A small backend is necessary for AI even before saving exists.
2. **Persistence:** decide between browser-local drafts and hosted history based on actual usage. Accounts, cross-device access, and shareable review links are deferred.

## Project map

- [Project details](docs/project-details.md): audience, scope, stack, and product principles.
- [Frontend plan](docs/plans/frontend-v1.md): flow, design, architecture, and acceptance checks.
- [Decision log](docs/decisions.md): dated choices and tradeoffs.
- [Developer setup](README.md): run commands and verification.

Update this checklist after verified work. Record changes in scope and their reasons in the decision log before implementation.
