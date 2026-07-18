# AGENTS.md — AI Generate Studio (Frontend)

Rules for any AI agent working in this repo.

## Ground Rule

Do exactly what is asked. Nothing more.

- No "while I'm at it" refactors.
- No adding features, files, comments, tests, or config that weren't requested.
- No changing code style, formatting, or naming in files you weren't asked to touch.
- No installing new packages unless explicitly told to.
- If a task is ambiguous, make the smallest reasonable assumption and state it in one line — don't ask multiple clarifying questions, don't over-explain.

## Project Context

- **Stack:** Next.js (App Router), Tailwind CSS, shadcn/ui, better-auth
- **Backend:** Separate Express.js API at `NEXT_PUBLIC_API_URL` — this repo is frontend only. Never write backend logic here.
- **Folder structure:** Already defined in `PROJECT_REQUIREMENTS.md` (or `/docs`). Follow it exactly. Don't invent new folders/patterns.

## Route Groups (fixed — don't restructure)

```

```

## Coding Rules

1. **Match existing patterns.** Look at neighboring files/components before writing new ones. Copy the established style, don't introduce a new one.
2. **Use shadcn/ui components already in the project** — don't build custom versions of things shadcn already provides (buttons, inputs, dialogs, etc.).
3. **Tailwind only** — no inline styles, no styled-components, no CSS modules unless already present.
4. **One task = one concern.** If asked to build the `text-to-image` page, only touch files needed for that page. Don't touch `history/`, `billing/`, etc. unless asked.
5. **No premature abstraction.** Don't create shared hooks/utils "for future reuse" unless explicitly requested — duplicate a few lines if needed rather than guessing at an abstraction.
6. **API calls** go through `lib/api.ts` (the existing Axios instance). Don't create a new fetch wrapper.
7. **Types** go in `types/index.ts` if shared, or co-located if page-specific. Don't create a new types system.

## What NOT to do

- Don't open scratchpad. I will test that manually.
- Don't add error boundaries, loading skeletons, animations, or accessibility improvements unless asked — even if you think they'd help.
- Don't add comments explaining obvious code.
- Don't write tests unless asked.
- Don't touch `.env`, `next.config.ts`, `tailwind.config.ts`, or auth config unless the task is specifically about those.
- Don't rename existing variables/files/routes as a "cleanup."
- Don't add TODO comments or placeholder logic beyond what's needed to make the requested feature work.

## Output Expectations

- Keep responses short. Show the code, not a lecture.
- If a change affects multiple files, list them briefly — don't narrate every line.
- If something in the request conflicts with this file, follow this file and say so in one line.
