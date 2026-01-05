I have a persistent i18n issue and I need a root-cause analysis, not generic advice.

Context:

Tech stack: Next.js (App Router) + TypeScript

i18n library: (explicitly state: next-intl / next-i18next / custom setup)

Translations work correctly in most components

The issue is isolated to: @src/components/HeroSection.tsx

Problem:

Text inside HeroSection.tsx always renders in English

Switching locale to ar works globally except this component

I already applied all standard solutions you suggested

No runtime errors; the output language is simply wrong

What I need from you:

Identify why a single component ignores locale changes

Analyze Server vs Client Component boundaries in the App Router

Investigate static rendering, memoization, or cached output

Consider path alias imports (@src) and module resolution

Explain any fallback or hardcoded behavior that could lock the language

Important constraints:

Do NOT touch or rewrite my code

Do NOT output code snippets

I will apply the fixes myself

Present all solutions as a Markdown (.md) file

Use clear sections, bullet points, and short explanations

Avoid repeating basic i18n setup steps

Deliverable:

A precise explanation of the most likely root cause

One or two high-confidence fixes, not multiple guesses

A diagnostic checklist to confirm the issue

If you need to make assumptions, state them explicitly and justify them.
