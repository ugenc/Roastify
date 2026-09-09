# Roastify — project details

## Purpose

A playful critique workspace for designers exploring a single UI screenshot. Different fictional needs help the designer decide what to keep, change, or investigate with real people. The audience is individual designers iterating on their work and preparing discussion material for teammates or clients.

## Product principles

- Feedback must connect to a named design element, a plausible consequence, and a next step.
- Simulated perspectives are hypotheses, not independent research evidence or accessibility certification.
- The designer curates the result. The report represents their selected comments and notes.
- Distinct needs matter more than demographic backstories or theatrical personality.
- The app is playful; the exported report is neutral and professional.

## Phase 1 scope

Select one local PNG/JPG (maximum 10 MB), preview it, enter audience and task, reveal 15 authored comments, filter by person, dismiss/restore, add notes, and print a report. The bundled sample is a fictional Little Studio workshop-discovery page. All feedback describes that sample, including when a custom image is previewed; this limitation is explicit in the UI and report.

Five perspectives: Maya (first-time visitor), Leo (limited time), Priya (costs and commitments), Sam (readability and clarity), and Alex (repeat tasks).

No image upload occurs. No AI, accounts, persistence, analytics, or third-party font requests are implemented. Refreshing resets work. Fonts and illustration assets are served locally.

## Technology

Next.js App Router and React; TypeScript; Tailwind CSS plus a custom token-based stylesheet; shadcn/ui-style source-owned Button using Radix Slot and CVA; Lucide icons; local Fontsource Space Grotesk and DM Sans. Vercel is the intended future host; this delivery runs locally.

## Success

A designer can finish the sample flow, identify a plausible change and research question, select useful feedback, and produce a readable report without mistaking example comments for analysis of their upload.
