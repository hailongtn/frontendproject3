import { NextResponse } from 'next/server';

// This route proxies authentication checks to your .NET backend when BACKEND_URL is set.
// If BACKEND_URL is not configured, it returns a dev-friendly stub (authorized=true) so
// you can work on the admin UI without a backend during development.

export async function GET(request) {
  const BACKEND = process.env.BACKEND_URL;

  if (!BACKEND) {
    // Dev mode: check for a dev cookie first (so login/logout flow works locally)
    const cookieHeader = request.headers.get('cookie') || '';
    if (cookieHeader.includes('dev_admin_token=')) {
      return NextResponse.json({ authorized: true, userId: 'dev-admin' });
    }
    return NextResponse.json({ authorized: false });
  }

  try {
    // Forward request to the .NET backend auth endpoint. Adjust path as needed.
    const backendRes = await fetch(`${BACKEND.replace(/\/$/, '')}/admin/auth`, {
      method: 'GET',
      headers: {
        // forward cookies from incoming request if any
        cookie: request.headers.get('cookie') || ''
      }
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    return NextResponse.json({ authorized: false }, { status: 500 });
  }
}
