import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const supportedLocales = ['fr', 'en', 'de'];
    const defaultLocale = 'fr';

    const pathname = request.nextUrl.pathname;
    const localeMatch = pathname.match(/^\/(fr|en|de)\b/);
    const locale = localeMatch ? localeMatch[1] : defaultLocale;

    const response = NextResponse.next();
    response.headers.set('x-next-intl-locale', locale);

    return response;
}

export const config = {
    matcher: '/:path*',
};
