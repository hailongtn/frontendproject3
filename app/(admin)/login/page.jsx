"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <label className="block mb-2">
          <span className="text-sm">Username</span>
          <input value={username} onChange={(e)=>setUsername(e.target.value)} className="mt-1 block w-full border rounded p-2" />
        </label>
        <label className="block mb-4">
          <span className="text-sm">Password</span>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 block w-full border rounded p-2" />
        </label>
        <button className="w-full bg-blue-600 text-white p-2 rounded">Sign in</button>
      </form>
    </div>
  );
}
