import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
   locales: ['he', 'en'],
   defaultLocale: 'he',
   localePrefix: 'always',
   localeDetection: false
});

export const config = {
   // Skip all paths that should not be internationalized. This example skips the
   // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
   matcher: ['/((?!api|test|_next|.*\\..*).*)']
};