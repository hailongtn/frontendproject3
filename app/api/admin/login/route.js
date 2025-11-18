import { NextResponse } from 'next/server';

// Dev login endpoint: sets a simple dev cookie so the admin auth proxy
// returns authorized when BACKEND_URL is not configured. This is only
// intended for local development.

export async function POST(request) {
  const BACKEND = process.env.BACKEND_URL;
  const body = await request.json().catch(() => ({}));

  // If a real backend is configured, proxy the login request to it.
  if (BACKEND) {
    try {
      const backendRes = await fetch(`${BACKEND.replace(/\/$/, '')}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        // allow backend to set cookies
        credentials: 'include',
      });
      const data = await backendRes.json().catch(() => ({}));
      return NextResponse.json(data, { status: backendRes.status });
    } catch (err) {
      return NextResponse.json({ success: false, message: 'backend error' }, { status: 500 });
    }
  }

  // Dev mode: accept any credentials and set a dev_admin_token cookie
  try {
    const token = `dev-${Date.now()}`;
    const res = NextResponse.json({ success: true, authorized: true });
    res.cookies.set('dev_admin_token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
    });
    return res;
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message || 'failed' }, { status: 500 });
  }
}
