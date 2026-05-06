import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['he', 'en'],
    defaultLocale: 'he',
    localePrefix: 'always',
    localeDetection: false
});

export const config = {
    matcher: ['/((?!story|voice|nutrition|stories-dashboard|api|_next|.*\\..*).*)']
};
