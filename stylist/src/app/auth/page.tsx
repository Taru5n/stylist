'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { SplitText } from '@/components/ui/SplitText';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/questionnaire');
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-ink/20 z-10" />
        <img
          src="https://images.unsplash.com/photo-1550614000-4b95d466e133?w=1200&q=80"
          alt="Fashion Editorial"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-20">
           <SplitText tag="h2" className="font-display text-5xl text-ivory font-bold leading-tight max-w-md">
              Unlock your signature style.
           </SplitText>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 relative">
         <div className="w-full max-w-md">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
               <h1 className="font-display text-4xl font-bold text-ink mb-2">
                 {isLogin ? 'Welcome Back' : 'Join MINES'}
               </h1>
               <p className="text-ink/60 font-body mb-10">
                 {isLogin ? 'Enter your details to access your stylist.' : 'Create an account to begin your style journey.'}
               </p>

               <form onSubmit={handleAuth} className="space-y-6">
                 <div>
                    <label className="block text-xs uppercase tracking-widest text-ink/70 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-border py-3 text-ink placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors"
                      placeholder="Enter your email"
                      required
                    />
                 </div>
                 <div>
                    <label className="block text-xs uppercase tracking-widest text-ink/70 font-medium mb-2">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border-b border-border py-3 text-ink placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors"
                      placeholder="Enter your password"
                      required
                    />
                 </div>

                 {error && (
                   <p className="text-red-500 text-sm mt-2">{error}</p>
                 )}

                 <div className="pt-6">
                    <MagneticButton variant="primary" className="w-full" disabled={loading}>
                       {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
                       {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                    </MagneticButton>
                 </div>
               </form>

               <div className="mt-8 text-center">
                  <p className="text-sm text-ink/60">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-gold font-medium hover:underline">
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
               </div>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
