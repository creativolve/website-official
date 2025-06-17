import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Daftar gambar yang ingin kamu cegah agar tidak keindeks
  const blockedImages = [
    '/favicon.png',
    '/images/home_icon.png',
    '/images/tentangPage/circle.png',
    '/images/tentangPage/circle.png',
    '/images/pusatLaySec/image.png',
    '/images/pusatLayPage/background.png',
    '/images/pusatLayPage/circle.png',
    '/images/hero_section/circle.png',
    '/images/form/circle.png',
    '/images/ChatAI/avatars.png',
    '/images/card',
    '/images/blog/circleBf.png',
  ];

  if (blockedImages.includes(pathname)) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, noimageindex');
    return response;
  }

  return NextResponse.next();
}

// Aktifkan middleware hanya untuk gambar di public/images/...
export const config = {
  matcher: ['/images/:path*'],
};
