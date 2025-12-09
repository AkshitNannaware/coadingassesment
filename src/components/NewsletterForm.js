"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setMessage("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Subscription failed. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-3 rounded-2xl bg-white/10 p-3 text-white backdrop-blur lg:flex-row lg:items-center lg:bg-transparent lg:p-0"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email Address"
        className="flex-1 rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-white placeholder:text-white/70 outline-none transition focus:border-white focus:bg-white/30"
      />
      <button
        type="submit"
        className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:bg-white/70"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting..." : "Subscribe"}
      </button>
      {message && (
        <p className="text-sm text-blue-100 lg:absolute lg:-bottom-6">{message}</p>
      )}
    </form>
  );
}


