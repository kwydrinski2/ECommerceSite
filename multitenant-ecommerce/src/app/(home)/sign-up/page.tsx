"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Roboto_Condensed } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const poppins = Roboto_Condensed({
    subsets: ["latin"],
    weight: ["700"]
});

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message);
      return;
    }

    // Store token
    localStorage.setItem("token", data.token);

    // Store user identity
    localStorage.setItem("user", JSON.stringify(data.user));

    router.push("/discover");
  }

  return (
    <div className="py-30 pl-150">
      <span className={cn("text-4xl font-semibold app", poppins.className)}>CREATE AN ACCOUNT</span>

    <div className="pl-25">
        {message && <span className={cn("text-1xl font-semibold text-amber-800", poppins.className)}>{message}</span>}
    </div>
    
      <form onSubmit={handleLogin}>
        <div className="py-5">
          <input className="border w-80"
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="py-5">
          <input className="border w-80"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="py-5">
          <input className="border w-80"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" variant="default" className="app w-80 pl-4">sign up</Button>
      </form>
    </div>
  );
}