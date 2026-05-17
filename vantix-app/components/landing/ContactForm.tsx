"use client";

import { Mail, Send } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    fetch("/api/crm/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: "landing_page",
        status: "new",
      }),
    })
      .then(() => {
        setSubmitted(true);
        setEmail("");
        setTimeout(() => setSubmitted(false), 3000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <section id="contact" className="py-20 px-4 bg-black">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
          Gotowy do systemu?
        </h2>
        <p className="text-neutral-400 text-lg mb-12">
          Zaproszenie beta dostępne dla wybranych. Daj znać swoją opinię.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Twój email"
              className="w-full pl-12 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-yellow-600 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-yellow-600 text-black font-semibold rounded-lg hover:bg-yellow-500 transition flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Send className="w-4 h-4" />
            Wyślij
          </button>
        </form>

        {submitted && (
          <div className="mt-4 p-3 bg-green-600/20 border border-green-600/50 rounded-lg text-green-400 text-sm">
            ✓ Dzięki! Skontaktujemy się wkrótce.
          </div>
        )}

        <p className="text-neutral-500 text-xs mt-6">
          Nie spam, obiecujemy. Tylko informacje o Vantix OS.
        </p>
      </div>
    </section>
  );
}
