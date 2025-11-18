import { NextResponse } from 'next/server';

export async function POST(request) {
  const BACKEND = process.env.BACKEND_URL;

  if (BACKEND) {
    // Let backend handle logout when configured
    try {
      const backendRes = await fetch(`${BACKEND.replace(/\/$/, '')}/admin/logout`, {
        method: 'POST',
        headers: {
          cookie: request.headers.get('cookie') || ''
        }
      });
      const data = await backendRes.json().catch(() => ({}));
      return NextResponse.json(data, { status: backendRes.status });
    } catch (err) {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  }

  const res = NextResponse.json({ success: true });
  // clear dev cookie
  res.cookies.set('dev_admin_token', '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
