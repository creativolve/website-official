import { cookies } from 'next/headers';

export async function GET() {
  cookies().set({
    name: 'my_cookie',
    value: 'value',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None', // Untuk lintas situs
    path: '/',
  });

  return Response.json({ success: true });
}