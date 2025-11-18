"use server";



import { cookies } from "next/headers";

export async function getAdmin() {
    // Call the internal API route which will proxy to your .NET backend when configured.
    try {
        // Read cookies from the incoming request (server-side) and forward them
        const cookieJar = cookies();
        const devToken = cookieJar.get("dev_admin_token")?.value;
        const cookieHeader = devToken ? `dev_admin_token=${devToken}` : "";

        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/admin/auth`, {
            method: "GET",
            headers: {
                cookie: cookieHeader,
            },
            // don't cache this request
            next: { revalidate: 0 },
        });

        if (!res.ok) return { authorized: false };

        const data = await res.json();
        return { authorized: !!data.authorized, userId: data.userId ?? null };
    } catch (err) {
        // In development, fall back to an authorized stub so you can work on the admin UI
        if (process.env.NODE_ENV !== "production") {
            return { authorized: true, userId: "dev-admin" };
        }
        return { authorized: false };
    }
}