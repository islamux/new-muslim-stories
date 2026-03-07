# New Muslim Stories

## 🧠 General Idea

This web application, built with Next.js and TypeScript, focuses on showcasing stories of new Muslims from around the world. The application aims to be a source of inspiration and an introduction to the experiences of these individuals and how they embraced Islam, along with brief information about their previous cultural and religious backgrounds. The goal is to convey powerful human and spiritual messages in a visually appealing and engaging manner.

## 🧱 Technical Requirements

*   **Framework:** Next.js (App Router) with TypeScript.
*   **Styling:** Tailwind CSS for the user interface.
*   **Responsiveness:** Fully responsive design for mobile, tablet, and desktop.
*   **Multilingual Support:** Internationalization (i18n) with support for at least English and Arabic.
*   **Content Storage:** Markdown or a CMS (e.g., Sanity.io or Contentful) for storing stories.

## 🎨 UI/UX Design

*   **Overall Aesthetic:** Attractive and modern interface with calm and spiritual touches.
*   **Homepage:**
    *   Elegant header with a welcoming phrase (e.g., "Stories of Guidance from Around the World").
    *   Featured Stories section displaying selected stories using animated cards.
    *   "Who are New Muslims?" section with introductory information.
*   **Individual Story Page:**
    *   Person's photo (if available), country, first name only (for privacy), and age.
    *   Brief background about their life before Islam.
    *   Details about the moment of conversion and reason for embracing Islam.
    *   Impactful quotes from them after embracing Islam.
*   **Visual Effects:**
    *   Parallax scrolling.
    *   Framer Motion for animating elements on scroll.
    *   Calm color gradients (colors like light green, beige, gold, sky blue).

## 🧩 Application Features

*   **Story Filtering:** Ability to filter stories by country or previous religious background.
*   **Search:** Search box to find stories based on keywords.
*   **Social Sharing:** Share buttons for stories on social media.
*   **"Story of the Day":** A featured story displayed automatically each day.
*   **"What's Next?":** Section providing links to learn more about Islam or connect with Islamic centers.

## 🧪 Development and Testing

*   **Project Structure:** Project built with reusable components.
*   **Testing:** Unit and UI tests using Jest and React Testing Library.
*   **Data Fetching:** Separation of data fetching logic using `getStaticProps` or `getServerSideProps` as needed.

## ✨ Suggested Additions

*   **Dark Mode:** Support for a dark theme.
*   **Admin Interface:** Simple administrative interface for adding new stories.
*   **Media Integration:** Ability to add introductory videos or audio recordings with stories.
*   **Simple Analytics:** Basic statistics (number of stories, represented countries, etc.).

## Getting Started

### Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **Package Manager**: pnpm (v10.28.0+)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

### Project Structure

```
new-muslim-stories/
├── messages/              # i18n translations (en.json, ar.json)
├── public/               # Static assets (photos, icons, manifest)
│   ├── photos/          # Story profile photos
│   ├── icon-192x192.png # PWA icon
│   └── icon-512x512.png # PWA icon
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── [locale]/    # Dynamic locale routes (en/ar)
│   │   └── offline/     # Offline fallback page
│   ├── components/       # React components
│   │   ├── ui/          # UI primitives (Section, Icon)
│   │   ├── HeroSection.tsx
│   │   ├── TopNav.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ...
│   ├── lib/              # Core business logic & utilities
│   │   ├── stories.ts
│   │   ├── story-parser.ts
│   │   └── story-service.ts
│   ├── hooks/            # Custom React hooks
│   │   ├── useIntersectionObserver.ts
│   │   ├── useMultipleIntersectionObserver.ts
│   │   └── useHasMounted.ts
│   ├── stories/          # Markdown story files (~20+ stories)
│   ├── i18n/             # Internationalization configuration
│   │   ├── routing.ts    # Central routing configuration
│   │   └── request.ts    # Request configuration
│   └── proxy.ts          # i18n middleware (Next.js 16)
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Internationalization (i18n)

This project supports English and Arabic with full RTL support using `next-intl`.

### Key i18n Files

- **`src/i18n/routing.ts`** - Central routing configuration
- **`src/i18n/request.ts`** - Request configuration for Next.js 16
- **`src/proxy.ts`** - Middleware for locale routing
- **`messages/en.json`** - English translations
- **`messages/ar.json`** - Arabic translations

### Important: Next.js 16 + next-intl Setup

**This project uses Next.js 16 which requires specific i18n setup:**

1. **`setRequestLocale()` must be called** in all layouts and pages before using `getMessages()` or `useTranslations()`

2. **File naming changes:**
   - `middleware.ts` → `proxy.ts` (Next.js 16 rename)
   - `i18n.ts` → `i18n/request.ts` (new API)

3. **Centralized routing config:**
   - All locale config is in `src/i18n/routing.ts`
   - Imported by `proxy.ts`, `navigation.ts`, and `request.ts`

### Adding New Translations

1. Add keys to both `messages/en.json` and `messages/ar.json`
2. Use in components: `const t = useTranslations('Namespace'); t('key')`

### Common Issues

**Arabic pages showing English?**
- Ensure `setRequestLocale(locale)` is called in `src/app/[locale]/layout.tsx`
- Check that `proxy.ts` excludes static assets: `matcher: ['/((?!api|_next|.*\\..*).*)']`

For detailed troubleshooting, see [`docs/NEXT_INTL_FIX_GUIDE.md`](docs/NEXT_INTL_FIX_GUIDE.md).

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js 16 features and API
- [React Documentation](https://react.dev/) - React 19 features
- [next-intl Documentation](https://next-intl.dev/docs) - Internationalization
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Tailwind v4
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Current Features

✅ **Implemented**:
- Multi-language support (English/Arabic with RTL)
- Markdown-based story content management
- PWA with offline support
- Dark/Light theme toggle
- Profile photos for stories
- Story filtering and search
- Responsive design
- Static site generation
- Service worker caching

🚧 **Planned**:
- Unit testing with Vitest
- Code splitting optimization
- Image optimization with next/image
- Storybook documentation
- Analytics integration

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Documentation

For detailed project documentation, see:

- [PROJECT_BLUEPRINT.md](docs/PROJECT_BLUEPRINT.md) - Complete architecture guide
- [NEXT_INTL_FIX_GUIDE.md](docs/NEXT_INTL_FIX_GUIDE.md) - Next.js 16 + next-intl setup guide
