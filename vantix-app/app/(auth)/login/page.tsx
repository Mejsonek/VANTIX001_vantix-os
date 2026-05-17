'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { LogIn, Mail, Lock, Shield } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="vx-card !p-10">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="relative">
          <div className="w-10 h-10 border border-gold/30 bg-gold/5 flex items-center justify-center">
            <span className="font-display text-sm font-extrabold text-gold" style={{ letterSpacing: '0.08em' }}>
              VX
            </span>
          </div>
          <div
            className="absolute -inset-[3px] border border-gold/[0.08] animate-pulse pointer-events-none"
            style={{ animationDuration: '3s' }}
          />
        </div>
        <div>
          <div
            className="font-display text-xs font-bold text-gold/80"
            style={{ letterSpacing: '0.12em' }}
          >
            VANTIX OS
          </div>
          <div className="font-mono text-[9px] text-ivory/20">System Panel</div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-1.5">
          <label className="vx-label">Email</label>
          <div className="relative">
            <Mail size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/15" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="np. zdzalkak@gmail.com"
              required
              className="w-full bg-s2 border border-gold/10 pl-9 pr-4 py-2.5 font-mono text-[11px] text-ivory/60 placeholder:text-ivory/15 focus:border-gold/30 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="vx-label">Hasło</label>
          <div className="relative">
            <Lock size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/15" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-s2 border border-gold/10 pl-9 pr-4 py-2.5 font-mono text-[11px] text-ivory/60 placeholder:text-ivory/15 focus:border-gold/30 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 px-3 py-2 border border-red/20 bg-red/[0.05]">
            <Shield size={10} className="text-red flex-shrink-0" />
            <p className="font-mono text-[10px] text-red/70">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full !text-[10px] !py-3"
        >
          <LogIn size={12} />
          {loading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
      </form>

      <p className="mt-6 text-center font-mono text-[9px] text-ivory/15">
        Vantix OS • Kacper Zdżałka • System Panel
      </p>
    </div>
  );
}
