import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import overcoatImg from '../assets/images/lookbook_tailored_overcoat_1791273056050.jpg';

interface StorySectionProps {
  onExploreCollection: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onExploreCollection }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25
  });

  // Parallax glide for the editorial archive image
  const imageY = useTransform(smoothProgress, [0, 1], ['-8%', '8%']);
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.08, 1.02, 1.08]);

  return (
    <section
      ref={sectionRef}
      id="atelier"
      className="py-20 lg:py-28 bg-[#FAF9F6] border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <div className="text-xs uppercase tracking-[0.25em] text-[#18181A]/60 font-medium mb-3">
            Atelier Philosophy & Provenance
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#18181A] tracking-tight leading-[1.15]">
            Clothing as Quiet Architecture <br />
            <span className="italic">Built to Transcend the Seasonal Cycle</span>
          </h2>
        </div>

        {/* 2-Column Split: Editorial Pillars & Atelier Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: 3 Pillars with Editorial Numbering */}
          <div className="lg:col-span-7 space-y-12">
            {/* Pillar 01 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="pb-8 border-b border-black/[0.08]"
            >
              <div className="text-xs font-mono text-[#18181A]/50 tracking-widest uppercase mb-2">
                01. Sourced Mills of Northern Italy
              </div>
              <h3 className="font-serif text-2xl text-[#18181A] font-medium mb-3">
                Virgin Wools from Biella & Zegna Baruffa
              </h3>
              <p className="text-sm leading-relaxed text-[#18181A]/75 font-light">
                Our raw fiber journey begins in the Alpine foothills of Piedmont. We collaborate exclusively with multi-generational Lanificio spinning houses that employ pure glacier meltwater for washing, preserving the natural lanolin sheen and elastic resilience of the sheep's fleece without aggressive synthetic stripping.
              </p>
            </motion.div>

            {/* Pillar 02 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="pb-8 border-b border-black/[0.08]"
            >
              <div className="text-xs font-mono text-[#18181A]/50 tracking-widest uppercase mb-2">
                02. Architectural Pattern Drafting
              </div>
              <h3 className="font-serif text-2xl text-[#18181A] font-medium mb-3">
                Unstructured Drapes & French Inner Finishes
              </h3>
              <p className="text-sm leading-relaxed text-[#18181A]/75 font-light">
                Every silhouette is drafted on physical muslin forms in our Parisian design studio on Rue Vivienne. We strip away heavy glued interlinings and stiff plastic pads in favor of floating chest canvases, allowing garments to conform organically to the wearer's anatomy while preserving architectural grace.
              </p>
            </motion.div>

            {/* Pillar 03 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-xs font-mono text-[#18181A]/50 tracking-widest uppercase mb-2">
                03. Small-Batch Numbered Editions
              </div>
              <h3 className="font-serif text-2xl text-[#18181A] font-medium mb-3">
                Zero Deadstock & Controlled Production
              </h3>
              <p className="text-sm leading-relaxed text-[#18181A]/75 font-light">
                We produce strictly capped runs of 80 to 200 units per silhouette. Every garment bears a discreet interior woven label denoting its individual batch number. By deliberately refusing volume markdowns and liquidations, we preserve the dignity of artisan labor and ensure genuine heirloom value.
              </p>
            </motion.div>

            <div className="pt-4">
              <button
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#18181A] border-b border-[#18181A] pb-1 hover:opacity-70 transition-opacity cursor-pointer"
              >
                <span>View Current Batch Silhouettes</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Anchor with Parallax Window */}
          <div
            ref={imageContainerRef}
            className="lg:col-span-5 bg-[#F2EFE9] border border-black/10 relative overflow-hidden"
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="w-full h-[115%] -mt-[7%] will-change-transform"
              >
                <img
                  src={overcoatImg}
                  alt="Atelier Tailoring Workmanship"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter grayscale-[20%] contrast-[1.05]"
                />
              </motion.div>
            </div>
            <div className="p-6 bg-white border-t border-black/[0.06] relative z-10">
              <div className="text-[11px] uppercase tracking-widest text-[#18181A]/60 mb-1">
                Atelier Archive Dossier
              </div>
              <div className="font-serif text-lg text-[#18181A]">
                The Lanificio Overcoat Construction
              </div>
              <p className="text-xs text-[#18181A]/70 mt-1 font-light leading-relaxed">
                620gsm virgin wool-cashmere cloth with hand-sewn horn buttons and floating Bemberg cupro lining.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

