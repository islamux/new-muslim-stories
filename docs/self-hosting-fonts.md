# Self-Hosting Google Fonts (Inter and Montserrat)

This guide provides steps to self-host the `Inter` and `Montserrat` fonts in your Next.js project to resolve `FetchError` issues during the build process.

## Why Self-Host?

Self-hosting fonts eliminates external dependencies during your build and runtime, making your application more resilient to network issues and improving build reliability.

## Steps:

### Step 1: Download Font Files

You need to obtain the `.woff2` font files for `Inter` and `Montserrat`. A convenient tool for this is [Google Webfonts Helper](https://google-webfonts-helper.herokuapp.com/fonts).

1.  Go to [Google Webfonts Helper](https://google-webfonts-helper.herokuapp.com/fonts).
2.  Search for "Inter".
    *   Select the styles/weights you use (e.g., Regular, Medium, SemiBold, Bold).
    *   Under "2. Choose your desired formats", ensure `woff2` is selected.
    *   Under "3. Copy CSS", change the "Customize folder prefix (optional)" to `./fonts/`.
    *   Download the `.zip` file.
3.  Repeat the process for "Montserrat".
    *   Select the styles/weights you use.
    *   Ensure `woff2` is selected.
    *   Change the "Customize folder prefix (optional)" to `./fonts/`.
    *   Download the `.zip` file.

### Step 2: Create a Font Directory

1.  In your project's `public` directory, create a new folder named `fonts`.
    ```bash
    mkdir -p public/fonts
    ```
2.  Extract the downloaded `.zip` files for `Inter` and `Montserrat` into the `public/fonts` directory. You should have `.woff2` files directly inside `public/fonts`.

### Step 3: Define `@font-face` Rules in Global CSS

1.  Open your global CSS file: `src/app/globals.css`.
2.  Add `@font-face` rules for each weight and style of `Inter` and `Montserrat` that you downloaded. Make sure the `src` URL points to the correct path within your `public/fonts` directory.

    **Example for Inter (adjust for all weights you use):**

    ```css
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400; /* Regular */
      font-display: swap;
      src: url('/fonts/inter-v13-latin-regular.woff2') format('woff2'); /* Adjust filename */
    }

    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700; /* Bold */
      font-display: swap;
      src: url('/fonts/inter-v13-latin-700.woff2') format('woff2'); /* Adjust filename */
    }
    /* Add more @font-face rules for other Inter weights */
    ```

    **Example for Montserrat (adjust for all weights you use):**

    ```css
    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 400; /* Regular */
      font-display: swap;
      src: url('/fonts/montserrat-v25-latin-regular.woff2') format('woff2'); /* Adjust filename */
    }

    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 700; /* Bold */
      font-display: swap;
      src: url('/fonts/montserrat-v25-latin-700.woff2') format('woff2'); /* Adjust filename */
    }
    /* Add more @font-face rules for other Montserrat weights */
    ```
    **Important:** The filenames in `url('/fonts/...')` must exactly match the filenames you extracted into `public/fonts`.

### Step 4: Update `src/app/layout.tsx`

1.  Open `src/app/layout.tsx`.
2.  Remove the `import { Inter, Montserrat } from 'next/font/google';` lines.
3.  Remove any usage of `Inter` and `Montserrat` font objects (e.g., `className={inter.className}`).

    **Before (example):**
    ```typescript
    import { Inter, Montserrat } from 'next/font/google';

    const inter = Inter({ subsets: ['latin'] });
    const montserrat = Montserrat({ subsets: ['latin'] });

    export default function RootLayout({ children }: { children: React.ReactNode }) {
      return (
        <html lang="en" className={`${inter.className} ${montserrat.className}`}>
          <body>{children}</body>
        </html>
      );
    }
    ```

    **After:**
    ```typescript
    // No next/font imports needed

    export default function RootLayout({ children }: { children: React.ReactNode }) {
      return (
        <html lang="en"> {/* Remove font classNames here */}
          <body>{children}</body>
        </html>
      );
    }
    ```

### Step 5: Apply Fonts Globally (CSS or Tailwind)

Now that the `@font-face` rules are defined, you need to apply these fonts to your HTML elements.

*   **Using Global CSS:**
    In `src/app/globals.css`, you can apply the fonts to the `body` or `html` element:
    ```css
    html, body {
      font-family: 'Inter', sans-serif; /* Inter as primary, sans-serif as fallback */
    }

    /* If you have specific elements that use Montserrat */
    .montserrat-text {
      font-family: 'Montserrat', sans-serif;
    }
    ```

*   **Using Tailwind CSS (Recommended if you use Tailwind):**
    1.  Open `tailwind.config.ts`.
    2.  Extend your `theme.fontFamily` to include your custom fonts.

        **Example `tailwind.config.ts`:**
        ```typescript
        import type { Config } from 'tailwindcss';

        const config: Config = {
          content: [
            './pages/**/*.{js,ts,jsx,tsx,mdx}',
            './components/**/*.{js,ts,jsx,tsx,mdx}',
            './app/**/*.{js,ts,jsx,tsx,mdx}',
          ],
          theme: {
            extend: {
              fontFamily: {
                inter: ['Inter', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
              },
            },
          },
          plugins: [],
        };

        export default config;
        ```
    3.  Then, you can apply these classes in your components (e.g., `<html lang="en" className="font-inter">`) or define them in your global CSS using `@apply`.

### Step 6: Test Your Build

After completing these steps, try running your build command again:

```bash
pnpm build
```

Your build should now succeed without the `FetchError` related to Google Fonts.
