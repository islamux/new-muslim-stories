# Project Structure

```
.
├── .claude/
│   └── settings.local.json
├── docs/
│   ├── ARABIC_TRANSLATION_FIX_REPORT.md
│   ├── DOCUMENTATION_PLAN.md
│   ├── fix-font-loading-error-plan.md
│   ├── IMPORT_GUIDE.md
│   ├── language-toggle-improvement-plan.md
│   ├── NEXTJS_16_MIGRATION_REPORT.md
│   ├── PROJECT_BLUEPRINT.md
│   ├── REACT_NEXTJS_TUTORIAL.md
│   ├── self-hosting-fonts.md
│   ├── TAILWIND_TUTORIAL.md
│   ├── TRANSLATION_ISSUE_ANALYSIS.md
│   └── typescript-interfaces-plan.md
├── messages/
│   ├── ar.json
│   └── en.json
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── manifest.json
│   ├── next.svg
│   ├── PWA_ICONS_REQUIRED.md
│   ├── sw.js
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── stories/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── offline/
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   └── Section.tsx
│   │   ├── Button.tsx
│   │   ├── FeaturedStories.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HomePageClient.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ProfileHeader.tsx
│   │   ├── PWAInstallPrompt.tsx
│   │   ├── ServiceWorkerRegistration.tsx
│   │   ├── StoryCard.tsx
│   │   ├── StoryContentDisplay.tsx
│   │   ├── StoryOfTheDay.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── TopNav.tsx
│   │   ├── WhatsNext.tsx
│   │   └── WhoAreNewMuslims.tsx
│   ├── hooks/
│   │   ├── useHasMounted.ts
│   │   ├── useIntersectionObserver.ts
│   │   ├── useMultipleIntersectionObserver.ts
│   │   └── useStorySections.ts
│   ├── lib/
│   │   ├── index.ts
│   │   ├── stories.ts
│   │   ├── story-parser.ts
│   │   └── story-service.ts
│   ├── messages/
│   │   ├── ar.json
│   │   └── en.json
│   ├── stories/
│   │   ├── abdal-malik-rezeski-story-ar.md
│   │   ├── abdal-malik-rezeski-story.md
│   │   ├── aisha-bhutta-story-ar.md
│   │   ├── aisha-bhutta-story.md
│   │   ├── amin-story-ar.md
│   │   ├── amin-story.md
│   │   ├── asia-story-ar.md
│   │   ├── asia-story.md
│   │   ├── barbara-story-ar.md
│   │   ├── barbara-story.md
│   │   ├── brazilian-doctor-story-ar.md
│   │   ├── brazilian-doctor-story.md
│   │   ├── brazilian-military-story-ar.md
│   │   ├── brazilian-military-story.md
│   │   ├── brazilian-taxi-driver-story-ar.md
│   │   ├── brazilian-taxi-driver-story.md
│   │   ├── british-journalist-story-ar.md
│   │   ├── british-journalist-story.md
│   │   ├── british-police-officer-story-ar.md
│   │   ├── british-police-officer-story.md
│   │   └── ... (46 more items)
│   ├── types/
│   │   ├── component.types.ts
│   │   ├── hook.types.ts
│   │   ├── index.ts
│   │   └── story.types.ts
│   ├── i18n.ts
│   ├── navigation.ts
│   └── proxy.ts
├── .eslintrc.json
├── .gitignore
├── .gitignore_bac
├── CLAUDE.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── ThemeToggle.tsx
├── todo.md
└── ... (6 more items)
```