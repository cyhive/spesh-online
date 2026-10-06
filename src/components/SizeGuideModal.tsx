import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  // Lock body & html scroll when size guide is open
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizingData = [
    {
      size: 'XS',
      chest: unit === 'in' ? '34 - 36' : '86 - 91',
      waist: unit === 'in' ? '28 - 30' : '71 - 76',
      hip: unit === 'in' ? '35 - 37' : '89 - 94',
      sleeve: unit === 'in' ? '32' : '81'
    },
    {
      size: 'S',
      chest: unit === 'in' ? '36 - 38' : '91 - 96',
      waist: unit === 'in' ? '30 - 32' : '76 - 81',
      hip: unit === 'in' ? '37 - 39' : '94 - 99',
      sleeve: unit === 'in' ? '33' : '84'
    },
    {
      size: 'M',
      chest: unit === 'in' ? '38 - 40' : '96 - 102',
      waist: unit === 'in' ? '32 - 34' : '81 - 86',
      hip: unit === 'in' ? '39 - 41' : '99 - 104',
      sleeve: unit === 'in' ? '34' : '86'
    },
    {
      size: 'L',
      chest: unit === 'in' ? '41 - 43' : '104 - 109',
      waist: unit === 'in' ? '35 - 37' : '89 - 94',
      hip: unit === 'in' ? '42 - 44' : '107 - 112',
      sleeve: unit === 'in' ? '35' : '89'
    },
    {
      size: 'XL',
      chest: unit === 'in' ? '44 - 46' : '112 - 117',
      waist: unit === 'in' ? '38 - 40' : '96 - 102',
      hip: unit === 'in' ? '45 - 47' : '114 - 119',
      sleeve: unit === 'in' ? '36' : '91'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-[#FAF9F6] w-full max-w-2xl shadow-2xl border border-black/10 p-6 sm:p-8 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/[0.08] pb-4 mb-6">
          <div>
            <h3 className="font-serif text-2xl text-[#18181A]">Atelier Sizing & Measure</h3>
            <p className="text-xs text-[#18181A]/60 uppercase tracking-wider mt-1">
              Architectural draping calibrated for international proportions
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close size guide"
            className="p-1.5 text-[#18181A]/60 hover:text-[#18181A] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between mb-4 text-xs">
          <span className="text-[#18181A]/70 uppercase tracking-wider">Garment Measurements</span>
          <div className="flex border border-black/15 bg-white p-0.5">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 font-medium transition-colors ${
                unit === 'in' ? 'bg-[#18181A] text-white' : 'text-[#18181A]'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 font-medium transition-colors ${
                unit === 'cm' ? 'bg-[#18181A] text-white' : 'text-[#18181A]'
              }`}
            >
              Centimeters
            </button>
          </div>
        </div>

        {/* Sizing Table */}
        <div className="overflow-x-auto border border-black/[0.08] bg-white mb-6">
          <table className="w-full text-left text-xs font-mono tabular-nums">
            <thead className="bg-[#F2EFE9] border-b border-black/[0.08] text-[11px] uppercase tracking-wider text-[#18181A]/80 font-sans">
              <tr>
                <th className="py-3 px-4 font-semibold">Size</th>
                <th className="py-3 px-4 font-medium">Chest ({unit})</th>
                <th className="py-3 px-4 font-medium">Waist ({unit})</th>
                <th className="py-3 px-4 font-medium">Hip ({unit})</th>
                <th className="py-3 px-4 font-medium">Sleeve ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {sizingData.map((row) => (
                <tr key={row.size} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-3 px-4 font-sans font-bold text-[#18181A]">{row.size}</td>
                  <td className="py-3 px-4 text-[#18181A]/80">{row.chest}</td>
                  <td className="py-3 px-4 text-[#18181A]/80">{row.waist}</td>
                  <td className="py-3 px-4 text-[#18181A]/80">{row.hip}</td>
                  <td className="py-3 px-4 text-[#18181A]/80">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-xs text-[#18181A]/70 leading-relaxed space-y-1.5 font-light">
          <p>
            • <strong className="font-medium text-[#18181A]">Coats & Outerwear:</strong> Cut with relaxed room to allow layering over chunky knitwear without constricting armholes.
          </p>
          <p>
            • <strong className="font-medium text-[#18181A]">Trousers:</strong> Designed with deep forward pleats and generous unhemmed length to facilitate custom alterations at your tailor.
          </p>
          <p>
            • <strong className="font-medium text-[#18181A]">Complimentary Alteration Allowance:</strong> All bespoke clients receive a $50 alteration credit upon request.
          </p>
        </div>
      </div>
    </div>
  );
};
