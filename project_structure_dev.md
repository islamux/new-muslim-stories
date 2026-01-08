# Project Structure

```
.
├── .claude/
│   └── settings.local.json
├── content/
│   ├── ar/
│   │   ├── about.md
│   │   ├── home.md
│   │   └── projects.json
│   ├── en/
│   │   ├── about.md
│   │   ├── home.md
│   │   └── projects.json
│   ├── es/
│   │   ├── about.md
│   │   ├── home.md
│   │   └── projects.json
│   ├── fr/
│   │   ├── about.md
│   │   ├── home.md
│   │   └── projects.json
│   └── tr/
│       ├── about.md
│       ├── home.md
│       └── projects.json
├── docs/
│   ├── COMPREHENSIVE_STATIC_EXPORT_GUIDE.md
│   ├── DUAL_STATIC_SSR_COMPATIBILITY_GUIDE.md
│   ├── HOOKS_GUIDE.md
│   ├── I18N_FIX_SUMMARY.md
│   ├── ISSUES_AND_SOLUTIONS.md
│   ├── PHASE_1_EXECUTION_PLAN.md
│   ├── PHASE_2_EXECUTION_PLAN.md
│   ├── PHASE_3_EXECUTION_PLAN.md
│   ├── PHASE_4_EXECUTION_PLAN.md
│   ├── PHASE_5_EXECUTION_PLAN.md
│   ├── PHASE_6_EXECUTION_PLAN.md
│   ├── PHASE_7_EXECUTION_PLAN.md
│   ├── PORTFOLIO_BUILD_GUIDE.md
│   ├── SENIOR_TO_JUNIOR_ADVICE.md
│   ├── SOC_REFACTORING_PLAN.md
│   ├── STATIC_VS_SSR_ANALYSIS.md
│   ├── TAILWIND_TUTORIAL.md
│   └── TYPES_REFERENCE.md
├── out/
│   ├── _next/
│   │   ├── naJORuaaLq3wXxAWJQfl4/
│   │   └── static/
│   │       ├── chunks/
│   │       ├── media/
│   │       └── naJORuaaLq3wXxAWJQfl4/
│   ├── _not-found/
│   │   ├── __next._full.txt
│   │   ├── __next._head.txt
│   │   ├── __next._index.txt
│   │   ├── __next._not-found.__PAGE__.txt
│   │   ├── __next._not-found.txt
│   │   └── __next._tree.txt
│   ├── ar/
│   │   ├── about/
│   │   │   ├── __next.$d$locale.about.__PAGE__.txt
│   │   │   ├── __next.$d$locale.about.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   └── __next._tree.txt
│   │   ├── contact/
│   │   │   ├── __next.$d$locale.contact.__PAGE__.txt
│   │   │   ├── __next.$d$locale.contact.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   └── __next._tree.txt
│   │   ├── projects/
│   │   │   ├── athkarix/
│   │   │   ├── huawei-router-control/
│   │   │   ├── khwater/
│   │   │   ├── portfolio/
│   │   │   ├── voices-of-truth/
│   │   │   ├── __next.$d$locale.projects.__PAGE__.txt
│   │   │   ├── __next.$d$locale.projects.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   ├── __next._tree.txt
│   │   │   ├── athkarix.html
│   │   │   ├── athkarix.txt
│   │   │   ├── huawei-router-control.html
│   │   │   ├── huawei-router-control.txt
│   │   │   ├── khwater.html
│   │   │   ├── khwater.txt
│   │   │   ├── portfolio.html
│   │   │   ├── portfolio.txt
│   │   │   └── voices-of-truth.html
│   │   │   └── voices-of-truth.txt
│   │   ├── __next.$d$locale.__PAGE__.txt
│   │   ├── __next.$d$locale.txt
│   │   ├── __next._full.txt
│   │   ├── __next._head.txt
│   │   ├── __next._index.txt
│   │   ├── __next._tree.txt
│   │   ├── about.html
│   │   ├── about.txt
│   │   ├── contact.html
│   │   ├── contact.txt
│   │   ├── projects.html
│   │   └── projects.txt
│   ├── en/
│   │   ├── about/
│   │   │   ├── __next.$d$locale.about.__PAGE__.txt
│   │   │   ├── __next.$d$locale.about.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   └── __next._tree.txt
│   │   ├── contact/
│   │   │   ├── __next.$d$locale.contact.__PAGE__.txt
│   │   │   ├── __next.$d$locale.contact.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   └── __next._tree.txt
│   │   ├── projects/
│   │   │   ├── athkarix/
│   │   │   ├── huawei-router-control/
│   │   │   ├── khwater/
│   │   │   ├── portfolio/
│   │   │   ├── voices-of-truth/
│   │   │   ├── __next.$d$locale.projects.__PAGE__.txt
│   │   │   ├── __next.$d$locale.projects.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   ├── __next._tree.txt
│   │   │   ├── athkarix.html
│   │   │   ├── athkarix.txt
│   │   │   ├── huawei-router-control.html
│   │   │   ├── huawei-router-control.txt
│   │   │   ├── khwater.html
│   │   │   ├── khwater.txt
│   │   │   ├── portfolio.html
│   │   │   ├── portfolio.txt
│   │   │   └── voices-of-truth.html
│   │   │   └── voices-of-truth.txt
│   │   ├── __next.$d$locale.__PAGE__.txt
│   │   ├── __next.$d$locale.txt
│   │   ├── __next._full.txt
│   │   ├── __next._head.txt
│   │   ├── __next._index.txt
│   │   ├── __next._tree.txt
│   │   ├── about.html
│   │   ├── about.txt
│   │   ├── contact.html
│   │   ├── contact.txt
│   │   ├── projects.html
│   │   └── projects.txt
│   ├── es/
│   │   ├── about/
│   │   │   ├── __next.$d$locale.about.__PAGE__.txt
│   │   │   ├── __next.$d$locale.about.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   └── __next._tree.txt
│   │   ├── contact/
│   │   │   ├── __next.$d$locale.contact.__PAGE__.txt
│   │   │   ├── __next.$d$locale.contact.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   └── __next._tree.txt
│   │   ├── projects/
│   │   │   ├── athkarix/
│   │   │   ├── huawei-router-control/
│   │   │   ├── khwater/
│   │   │   ├── portfolio/
│   │   │   ├── voices-of-truth/
│   │   │   ├── __next.$d$locale.projects.__PAGE__.txt
│   │   │   ├── __next.$d$locale.projects.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   ├── __next._tree.txt
│   │   │   ├── athkarix.html
│   │   │   ├── athkarix.txt
│   │   │   ├── huawei-router-control.html
│   │   │   ├── huawei-router-control.txt
│   │   │   ├── khwater.html
│   │   │   ├── khwater.txt
│   │   │   ├── portfolio.html
│   │   │   ├── portfolio.txt
│   │   │   └── voices-of-truth.html
│   │   │   └── voices-of-truth.txt
│   │   ├── __next.$d$locale.__PAGE__.txt
│   │   ├── __next.$d$locale.txt
│   │   ├── __next._full.txt
│   │   ├── __next._head.txt
│   │   ├── __next._index.txt
│   │   ├── __next._tree.txt
│   │   ├── about.html
│   │   ├── about.txt
│   │   ├── contact.html
│   │   ├── contact.txt
│   │   ├── projects.html
│   │   └── projects.txt
│   ├── fonts/
│   │   ├── Geist-Regular.woff2
│   │   └── GeistMono-Regular.woff2
│   ├── fr/
│   │   ├── about/
│   │   │   ├── __next.$d$locale.about.__PAGE__.txt
│   │   │   ├── __next.$d$locale.about.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   └── __next._tree.txt
│   │   ├── contact/
│   │   │   ├── __next.$d$locale.contact.__PAGE__.txt
│   │   │   ├── __next.$d$locale.contact.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   └── __next._tree.txt
│   │   ├── projects/
│   │   │   ├── athkarix/
│   │   │   ├── huawei-router-control/
│   │   │   ├── khwater/
│   │   │   ├── portfolio/
│   │   │   ├── voices-of-truth/
│   │   │   ├── __next.$d$locale.projects.__PAGE__.txt
│   │   │   ├── __next.$d$locale.projects.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   ├── __next._tree.txt
│   │   │   ├── athkarix.html
│   │   │   ├── athkarix.txt
│   │   │   ├── huawei-router-control.html
│   │   │   ├── huawei-router-control.txt
│   │   │   ├── khwater.html
│   │   │   ├── khwater.txt
│   │   │   ├── portfolio.html
│   │   │   ├── portfolio.txt
│   │   │   └── voices-of-truth.html
│   │   │   └── voices-of-truth.txt
│   │   ├── __next.$d$locale.__PAGE__.txt
│   │   ├── __next.$d$locale.txt
│   │   ├── __next._full.txt
│   │   ├── __next._head.txt
│   │   ├── __next._index.txt
│   │   ├── __next._tree.txt
│   │   ├── about.html
│   │   ├── about.txt
│   │   ├── contact.html
│   │   ├── contact.txt
│   │   ├── projects.html
│   │   └── projects.txt
│   ├── images/
│   │   └── projects/
│   │       ├── athkari-cover-v2.png
│   │       ├── athkari-cover.png
│   │       ├── khwater.png
│   │       ├── portfolio.png
│   │       ├── screenshot1.png
│   │       ├── voice-of-truth.png
│   │       └── voices_of_truth.png.bac
│   ├── test/
│   │   ├── __next._full.txt
│   │   ├── __next._head.txt
│   │   ├── __next._index.txt
│   │   ├── __next._tree.txt
│   │   ├── __next.test.__PAGE__.txt
│   │   └── __next.test.txt
│   ├── tr/
│   │   ├── about/
│   │   │   ├── __next.$d$locale.about.__PAGE__.txt
│   │   │   ├── __next.$d$locale.about.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   └── __next._tree.txt
│   │   ├── contact/
│   │   │   ├── __next.$d$locale.contact.__PAGE__.txt
│   │   │   ├── __next.$d$locale.contact.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   └── __next._tree.txt
│   │   ├── projects/
│   │   │   ├── athkarix/
│   │   │   ├── huawei-router-control/
│   │   │   ├── khwater/
│   │   │   ├── portfolio/
│   │   │   ├── voices-of-truth/
│   │   │   ├── __next.$d$locale.projects.__PAGE__.txt
│   │   │   ├── __next.$d$locale.projects.txt
│   │   │   ├── __next.$d$locale.txt
│   │   │   ├── __next._full.txt
│   │   │   ├── __next._head.txt
│   │   │   ├── __next._index.txt
│   │   │   ├── __next._tree.txt
│   │   │   ├── athkarix.html
│   │   │   ├── athkarix.txt
│   │   │   ├── huawei-router-control.html
│   │   │   ├── huawei-router-control.txt
│   │   │   ├── khwater.html
│   │   │   ├── khwater.txt
│   │   │   ├── portfolio.html
│   │   │   ├── portfolio.txt
│   │   │   └── voices-of-truth.html
│   │   │   └── voices-of-truth.txt
│   │   ├── __next.$d$locale.__PAGE__.txt
│   │   ├── __next.$d$locale.txt
│   │   ├── __next._full.txt
│   │   ├── __next._head.txt
│   │   ├── __next._index.txt
│   │   ├── __next._tree.txt
│   │   ├── about.html
│   │   ├── about.txt
│   │   ├── contact.html
│   │   ├── contact.txt
│   │   ├── projects.html
│   │   └── projects.txt
│   ├── 404.html
│   ├── __next.__PAGE__.txt
│   ├── __next._full.txt
│   ├── __next._head.txt
│   ├── __next._index.txt
│   ├── __next._tree.txt
│   ├── _not-found.html
│   ├── _not-found.txt
│   ├── ar.html
│   ├── ar.txt
│   ├── contact.html
│   ├── contact.txt
│   ├── en.html
│   ├── en.txt
│   ├── es.html
│   ├── es.txt
│   ├── fr.html
│   ├── fr.txt
│   ├── index.html
│   ├── index.txt
│   ├── tr.html
│   └── tr.txt
├── public/
│   ├── fonts/
│   │   ├── Geist-Regular.woff2
│   │   └── GeistMono-Regular.woff2
│   ├── images/
│   │   └── projects/
│   │       ├── athkari-cover-v2.png
│   │       ├── athkari-cover.png
│   │       ├── khwater.png
│   │       ├── khwater.png.bac
│   │       ├── portfolio.png
│   │       ├── screenshot1.png
│   │       ├── voice-of-truth.png
│   │       └── voices_of_truth.png.bac
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── scripts/
│   └── build-static.sh
├── src/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts
│   ├── app/
│   │   ├── (index)/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── [locale]/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── projects/
│   │   │   ├── generateStaticParams.ts
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── test/
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── metadata.ts
│   │   └── providers.tsx
│   ├── components/
│   │   ├── sections/
│   │   │   ├── ContactForm.tsx
│   │   │   ├── LanguagesSwitcher.tsx
│   │   │   ├── ProjectBackButton.tsx
│   │   │   ├── ProjectBreadcrumb.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectDescription.tsx
│   │   │   ├── ProjectDetailContainer.tsx
│   │   │   ├── ProjectHeader.tsx
│   │   │   ├── ProjectImage.tsx
│   │   │   ├── ProjectLinks.tsx
│   │   │   ├── ProjectsList.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   └── SiteHeader.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Icon.tsx
│   │   │   ├── MarkdownContent.tsx
│   │   │   ├── ProjectLink.tsx
│   │   │   └── SkipToContent.tsx
│   │   ├── Container.tsx
│   │   └── HomePage.tsx
│   ├── data/
│   │   └── socialLinks.ts
│   ├── hooks/
│   │   ├── useContactForm.ts
│   │   ├── useMounted.ts
│   │   └── useProjectFilter.ts
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── guards.ts
│   │   ├── navigation.ts
│   │   └── request.ts
│   ├── lib/
│   │   └── content.ts
│   ├── messages/
│   │   ├── ar.json
│   │   ├── en.json
│   │   ├── es.json
│   │   ├── fr.json
│   │   └── tr.json
│   ├── services/
│   │   └── projectService.ts
│   ├── types/
│   │   ├── content.ts
│   │   ├── index.ts
│   │   └── project.ts
│   └── middleware.ts.disabled
├── .claude_init.md
├── .fuse_hidden0000001300000008
├── .gitignore
├── CLAUDE.md
├── env.example
├── eslint.config.mjs
├── LICENSE
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
└── tsconfig.json
```
