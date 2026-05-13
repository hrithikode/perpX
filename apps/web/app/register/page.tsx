"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/axios";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      setLoading(true);
      setMessage("");

      await api.post("/api/auth/register", {
        name,
        email,
        password
      });

      setMessage("Registration successful. Redirecting to login...");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Register to start trading BTC perpetuals
          </p>
        </div>

        {message && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-3">
            <p className="text-sm text-blue-400 font-medium">{message}</p>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-white text-black font-bold p-3 rounded-xl"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </div>
    </div>
  );
}
