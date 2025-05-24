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

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
