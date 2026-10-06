import React, { useRef } from 'react';
import { ArrowDownRight, Compass } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { heroImg } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onLookbookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onLookbookClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax transforms: background moves down gently on scroll, text moves up slightly
  const imageY = useTransform(smoothProgress, [0, 1], ['0%', '12%']);
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.06]);
  const textY = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
  const textOpacity = useTransform(smoothProgress, [0, 0.85], [1, 0.25]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#18181A] text-[#FAF9F6] overflow-hidden"
    >
      {/* Background Image Container with Parallax Translation */}
      <div className="relative w-full h-[82vh] min-h-[620px] max-h-[900px] lg:h-[88vh] overflow-hidden">
        <motion.div
          style={{
            y: imageY,
            scale: imageScale,
            transformOrigin: 'top center'
          }}
          className="absolute inset-x-0 top-0 w-full h-[115%] will-change-transform"
        >
          <img
            src={heroImg}
            alt="Maison Vael Autumn / Winter 2026 Campaign Editorial"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top md:object-[center_top] filter brightness-[0.92] contrast-[1.02]"
          />
        </motion.div>

        {/* Measured contrast scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent hidden md:block pointer-events-none" />

        {/* Content Overlay with Parallax Float */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-0 max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-end pb-14 lg:pb-20 will-change-transform"
        >
          <div className="max-w-3xl">
            {/* Unboxed Metadata Header */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-white/75 font-medium mb-4"
            >
              <span>Collection No. 07</span>
              <span aria-hidden="true">·</span>
              <span>Autumn / Winter 2026</span>
              <span aria-hidden="true">·</span>
              <span className="hidden sm:inline">Paris & Biella</span>
            </motion.div>

            {/* Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.08] mb-6 text-balance"
            >
              The Architecture <br className="hidden sm:inline" />
              <span className="italic font-normal">of Form & Drapery</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/80 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl mb-8"
            >
              Sculpted virgin wool coats, sandwashed Mulberry silks, and seamless 3D merino knits. Designed in Paris, woven in century-old Italian mills, made to outlast seasons.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onExploreClick}
                className="px-7 py-3.5 bg-[#FAF9F6] text-[#18181A] hover:bg-white text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-200 flex items-center gap-2 group cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Discover Collection</span>
                <ArrowDownRight size={15} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onLookbookClick}
                className="px-7 py-3.5 border border-white/40 hover:border-white text-white text-xs tracking-[0.2em] uppercase font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer backdrop-blur-xs hover:bg-white/10 active:scale-[0.98]"
              >
                <Compass size={15} />
                <span>View Lookbook</span>
              </button>
            </motion.div>
          </div>

          {/* Bottom Provenance Strip */}
          <div className="mt-12 pt-6 border-t border-white/15 hidden md:flex items-center justify-between text-xs tracking-wider uppercase text-white/60">
            <div className="flex items-center gap-8">
              <div>
                <span className="text-white font-medium block">100% Trace-Audited</span>
                <span>Zegna Baruffa & Lanificio Wools</span>
              </div>
              <div className="h-6 w-[1px] bg-white/15" />
              <div>
                <span className="text-white font-medium block">Numbered Editions</span>
                <span>Small batch atelier production</span>
              </div>
              <div className="h-6 w-[1px] bg-white/15" />
              <div>
                <span className="text-white font-medium block">Tailored Delivery</span>
                <span>Complimentary global courier</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-white font-mono tabular-nums">08</span> Signature Silhouettes
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

