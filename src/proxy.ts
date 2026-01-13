import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],

  // Used when no locale matches
  defaultLocale: 'en',
});

export const config = {
  // Match only internationalized pathnames.
  // This regex excludes paths for static assets, API routes, and Next.js internal files.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
