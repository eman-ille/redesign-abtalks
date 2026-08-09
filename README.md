# ABTalks — Redesign

A mobile-first redesign of ABTalks, a 60-day coding streak challenge for
Indian college students. Built for the ABTalks Vibe Code Hackathon.

## Route Map

```
/
/dashboard
/day/12
```

## What it is

ABTalks students build something every day and prove it with a GitHub
commit + a LinkedIn post, maintaining a public streak. Most students use
it on their phones, late at night. This redesign focuses on that exact
context: fast to read at 390px, motivating without being noisy, and clear
about where a student stands at any moment.

## Routes

- **`/`** — Landing page for someone who's never heard of ABTalks. Explains
  the 60-day format and pushes toward starting a streak.
- **`/dashboard`** — Home screen after "logging in" (mocked). Shows current
  streak, today's task, overall progress, level, and achievements.
- **`/day/[day]`** — A single challenge day: task description, and a
  submission form for a GitHub link + LinkedIn post link (mocked, saved to
  `localStorage`, no real backend).

## Tech stack

- Next.js (App Router)
- Tailwind CSS
- `data/data.json` as the mocked backend
- `localStorage` for demo persistence (day submissions, level-up tracking)
- `canvas-confetti` for the level-up moment
- Deployed on Vercel

## The idea we leaned into

A terminal / dev-log aesthetic, since the audience is students who already
live in a code editor. The streak card reads like a contribution graph,
level names are flavored as build stages (`BOOTSTRAPPING` →
`COMPILING` → `SHIPPED`), and system messages borrow git language
(`git status: 1 day uncommitted`, `whoami: unknown`). Leveling up fires
confetti and a small `✔ level_up.sh executed` toast — a small, literal
payoff for consistency, which is the entire point of the product.

## Edge cases handled

All three are driven directly by the data in `data/data.json`, not hardcoded UI:

- **First day / zero streak** — no name-based streak yet, dashboard shows
  a welcoming "let's fix that" state instead of a bare "0".
- **Missed day** — a day entry with `status: "missed"` resets the streak
  to 0 but keeps the current level intact; only future task difficulty is
  affected. Shown with a distinct, non-punishing banner on both the
  dashboard and that specific day page.
- **Empty profile** — no name and nothing completed yet. Falls back to
  placeholder copy everywhere instead of rendering blank or `undefined`.

To see each state, edit the `student` object and one `days` entry in
`data/data.json` — no code changes needed.

## Running locally

```bash
npm install
npm run dev
```

## AI usage

See `PROMPTS.md` for the full log of prompts used throughout the build.