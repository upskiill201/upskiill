'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { MascotBackground } from '../onboarding/MascotBackground';

const socialLinks = [
  { icon: FaFacebook, href: 'https://facebook.com/teyroapp', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://instagram.com/teyroapp', label: 'Instagram' },
  { icon: FaTiktok, href: 'https://tiktok.com/@teyroapp', label: 'TikTok' },
  { icon: FaLinkedin, href: 'https://linkedin.com/company/teyro', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://x.com/teyroapp', label: 'X (Twitter)' },
];

export default function FinalCTA({ onOpenModal }: { onOpenModal: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/webhook/count');
        const data = await res.json();
        setWaitlistCount(data.count);
      } catch (err) {
        setWaitlistCount(0);
      }
    };
    fetchCount();
  }, []);

  return (
    <section className="relative w-full py-28 bg-[#EBF3FE] border-t border-blue-100/50 flex flex-col items-center justify-center overflow-hidden px-6 text-center z-10" ref={ref}>
      
      {/* 📱 Bubbles and decorative shapes background */}
      <MascotBackground />

      <div className="max-w-[800px] w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Celebratory Mascot Image */}
          <motion.div 
            animate={{ 
              y: [0, -6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-36 h-36 mb-6 flex items-center justify-center"
          >
            <Image 
              src="/User onbarding Assets/Step_10_image.webp" 
              alt="Celebrating Tey Mascot" 
              fill 
              className="object-contain drop-shadow-[0_10px_20px_rgba(1,114,253,0.06)]"
              sizes="144px"
            />
          </motion.div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-[#0172FD] border border-blue-100 rounded-full text-xs font-bold mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0172FD] animate-pulse" />
            <span>Limited Early Spots Available</span>
          </div>

          <h2 
            className="text-3xl md:text-5xl font-[900] text-[#071233] leading-none mb-6"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Join the learning revolution
          </h2>

          <p className="text-sm md:text-base font-semibold text-slate-500 max-w-xl leading-relaxed mb-10">
            Secure your spot on the waitlist today. Get early access to the Teyro Beta in late 2026 (November/December), exclusive founder credentials, and priority product updates.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto h-16 px-8 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-base tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(1,114,253,0.3)] cursor-pointer"
              onClick={onOpenModal}
              id="final-cta-btn"
            >
              <Zap className="w-5 h-5 fill-white stroke-[2.5]" />
              <span>
                {waitlistCount === null 
                  ? 'Loading live spots...' 
                  : waitlistCount === 0 
                    ? 'Claim the #1 spot — Get early access' 
                    : `Join ${waitlistCount.toLocaleString()} others — Get early access`}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs font-extrabold ml-2 border border-white/20">
                Free
              </span>
            </motion.button>
          </motion.div>

          <p className="text-xs font-semibold text-slate-400 mt-4">
            No credit card. No spam. Just your spot in line.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mt-12 pt-8 border-t border-blue-200/30 w-full justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Follow for updates:</span>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200/80 hover:border-slate-300 text-slate-600 hover:text-[#0172FD] hover:scale-105 transition-all flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}