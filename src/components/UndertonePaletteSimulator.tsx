import React, { useState } from 'react';
import { Sparkles, Palette, Check, RefreshCw, Eye, Sliders, ShieldCheck } from 'lucide-react';

interface SkinProfile {
  id: string;
  label: string;
  undertone: 'Warm' | 'Cool' | 'Neutral' | 'Olive';
  hex: string;
  lab: { L: number; a: number; b: number };
  ita: string; // Individual Typology Angle
  season: string;
  description: string;
  recommendedPalette: { name: string; hex: string; role: string }[];
  avoidPalette: { name: string; hex: string; reason: string }[];
}

const SAMPLE_PROFILES: SkinProfile[] = [
  {
    id: 'warm-golden',
    label: 'Golden Wheat (Warm)',
    undertone: 'Warm',
    hex: '#d89b6b',
    lab: { L: 67.2, a: 16.4, b: 28.9 },
    ita: '+38.4° (Warm Golden)',
    season: 'Warm Autumn',
    description: 'Yellow and peachy undertones that thrive in earthy, rich spices and warm metallic neutrals.',
    recommendedPalette: [
      { name: 'Terracotta Rust', hex: '#c85a32', role: 'Statement' },
      { name: 'Warm Olive Sage', hex: '#636b46', role: 'Base Neutral' },
      { name: 'Golden Mustard', hex: '#d99e32', role: 'Accent' },
      { name: 'Cream Cashmere', hex: '#ede3d1', role: 'Soft Light' },
    ],
    avoidPalette: [
      { name: 'Icy Magenta', hex: '#d92b7c', reason: 'Creates sallow color clash' },
      { name: 'Harsh Cold Gray', hex: '#8a929a', reason: 'Dulls warm complexion' },
    ],
  },
  {
    id: 'cool-rosy',
    label: 'Rosy Fair (Cool)',
    undertone: 'Cool',
    hex: '#f2cdba',
    lab: { L: 82.5, a: 11.2, b: 12.1 },
    ita: '+54.1° (Cool Rosy)',
    season: 'Cool Summer',
    description: 'Subtle pink/blue subcutaneous undertones illuminated by muted berries, slate blues, and soft rose.',
    recommendedPalette: [
      { name: 'Dusty Rose', hex: '#c97a8e', role: 'Accent' },
      { name: 'French Navy', hex: '#2c3e66', role: 'Statement' },
      { name: 'Slate Lavender', hex: '#7b7393', role: 'Base Neutral' },
      { name: 'Crisp Cloud', hex: '#f0f3f6', role: 'Soft Light' },
    ],
    avoidPalette: [
      { name: 'Mustard Ochre', hex: '#c68400', reason: 'Brings out redness' },
      { name: 'Rust Orange', hex: '#b8461b', reason: 'Clashes with cool pink tones' },
    ],
  },
  {
    id: 'neutral-olive',
    label: 'Sunlit Olive (Neutral)',
    undertone: 'Olive',
    hex: '#b8895b',
    lab: { L: 58.1, a: 8.9, b: 22.4 },
    ita: '+24.6° (Neutral Olive)',
    season: 'Deep Autumn / Olive',
    description: 'Balanced warm/cool with greenish-gray undertones; excels in jewel tones, rich plums, and teal.',
    recommendedPalette: [
      { name: 'Deep Emerald Teal', hex: '#1b5354', role: 'Statement' },
      { name: 'Burgundy Plum', hex: '#5c2438', role: 'Accent' },
      { name: 'Warm Charcoal', hex: '#33313b', role: 'Base Neutral' },
      { name: 'Champagne Silk', hex: '#e8dabf', role: 'Soft Light' },
    ],
    avoidPalette: [
      { name: 'Pale Pastel Neon', hex: '#a6ffcb', reason: 'Washes out olive undertones' },
      { name: 'Chalky Baby Pink', hex: '#f7b5cd', reason: 'Accentuate gray cast' },
    ],
  },
  {
    id: 'deep-warm',
    label: 'Rich Espresso (Deep Warm)',
    undertone: 'Warm',
    hex: '#5c3928',
    lab: { L: 34.2, a: 14.8, b: 19.5 },
    ita: '-18.2° (Deep Warm)',
    season: 'Deep Winter / Rich Warm',
    description: 'High melanin depth with radiant golden-red warmth that commands bold jewel tones and vibrant contrast.',
    recommendedPalette: [
      { name: 'Royal Cobalt', hex: '#1c3d99', role: 'Statement' },
      { name: 'Vibrant Marigold', hex: '#f59e0b', role: 'Accent' },
      { name: 'Deep Forest Green', hex: '#1a4329', role: 'Base Neutral' },
      { name: 'Pure Silk Ivory', hex: '#fef3c7', role: 'Contrast' },
    ],
    avoidPalette: [
      { name: 'Dull Muted Mud', hex: '#635349', reason: 'Zero luminosity contrast' },
      { name: 'Dusty Slate Gray', hex: '#6b7280', reason: 'Flattens rich saturation' },
    ],
  },
];

export const UndertonePaletteSimulator: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<SkinProfile>(SAMPLE_PROFILES[0]);
  const [activeSwatch, setActiveSwatch] = useState<string>(SAMPLE_PROFILES[0].recommendedPalette[0].hex);

  const handleSelectProfile = (profile: SkinProfile) => {
    setSelectedProfile(profile);
    setActiveSwatch(profile.recommendedPalette[0].hex);
  };

  return (
    <div className="w-full rounded-3xl p-5 sm:p-7 bg-[#14121f]/90 border border-white/10 shadow-2xl backdrop-blur-2xl text-[#f4f2f8]">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#2a1d2f] border border-[#dfb098]/30 text-[11px] font-bold text-[#dfb098] mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Computer Vision & CIELAB Engine</span>
          </div>
          <h4 className="font-display font-bold text-xl sm:text-2xl text-[#f4f2f8]">
            Skin Undertone & Color Harmony Simulator
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#9e97af] font-code bg-[#1c192b] px-3 py-1.5 rounded-xl border border-white/10">
          <ShieldCheck className="w-4 h-4 text-[#dfb098]" />
          <span>K-Means & ITA° Algorithm</span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Sample Skin Tone Selector */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9e97af]">
            1. Select Sample Skin Complexion:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SAMPLE_PROFILES.map((profile) => {
              const isSelected = selectedProfile.id === profile.id;
              return (
                <button
                  key={profile.id}
                  onClick={() => handleSelectProfile(profile)}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#221c33] border-[#dfb098] shadow-lg ring-1 ring-[#dfb098]/40'
                      : 'bg-[#181527]/70 hover:bg-[#1f1a30] border-white/10 text-[#c5bed5]'
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-xl shrink-0 shadow-inner border border-white/20"
                    style={{ backgroundColor: profile.hex }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-[#f4f2f8] truncate">
                      {profile.label}
                    </div>
                    <div className="text-[10px] text-[#dfb098] font-medium">
                      {profile.season}
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#dfb098] shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Real-time Math Diagnostics Card */}
          <div className="p-4 rounded-2xl bg-[#181527] border border-white/10 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#dfb098] block">
              CIELAB & Spectrophotometric Values
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-[#12101d] border border-white/5">
                <div className="text-[10px] text-[#9e97af]">Luminance L*</div>
                <div className="text-xs font-bold text-[#f4f2f8] font-code">
                  {selectedProfile.lab.L}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-[#12101d] border border-white/5">
                <div className="text-[10px] text-[#9e97af]">Red-Green a*</div>
                <div className="text-xs font-bold text-[#f4f2f8] font-code">
                  {selectedProfile.lab.a}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-[#12101d] border border-white/5">
                <div className="text-[10px] text-[#9e97af]">Yellow-Blue b*</div>
                <div className="text-xs font-bold text-[#f4f2f8] font-code">
                  {selectedProfile.lab.b}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs border-t border-white/10">
              <span className="text-[#9e97af]">Individual Typology Angle:</span>
              <span className="font-code font-bold text-[#dfb098]">
                {selectedProfile.ita}
              </span>
            </div>
            <p className="text-xs text-[#c5bed5] leading-relaxed pt-1">
              {selectedProfile.description}
            </p>
          </div>
        </div>

        {/* Right: Harmonious Color Recommendations & Interactive Swatches */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9e97af]">
            2. Algorithmic Wardrobe & Palette Harmonies:
          </span>

          {/* Recommended Palette Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {selectedProfile.recommendedPalette.map((swatch, idx) => {
              const isActive = activeSwatch === swatch.hex;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveSwatch(swatch.hex)}
                  className={`p-3 rounded-2xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#251f38] border-[#dfb098] ring-2 ring-[#dfb098]/30 shadow-lg scale-102'
                      : 'bg-[#181527] hover:bg-[#1e1930] border-white/10'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl mb-2 shadow-md border border-white/15"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="text-xs font-bold text-[#f4f2f8] leading-tight">
                    {swatch.name}
                  </span>
                  <span className="text-[10px] text-[#dfb098] font-semibold mt-0.5">
                    {swatch.role}
                  </span>
                  <span className="text-[10px] font-code text-[#9e97af] mt-1">
                    {swatch.hex}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Real-time Contrast & Wardrobe Overlay Preview */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#181528] to-[#201c33] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              {/* Simulated Dual-Patch (Skin + Wardrobe Swatch) */}
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl flex">
                <div
                  className="w-1/2 h-full"
                  style={{ backgroundColor: selectedProfile.hex }}
                  title="Skin Tone Patch"
                />
                <div
                  className="w-1/2 h-full transition-colors duration-300"
                  style={{ backgroundColor: activeSwatch }}
                  title="Selected Wardrobe Swatch"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-xs text-[9px] font-code text-center py-0.5 text-white">
                  Skin | Tone
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-[#dfb098] uppercase tracking-wide">
                  Active Wardrobe Contrast
                </div>
                <div className="text-sm font-bold text-[#f4f2f8] mt-0.5">
                  High Harmony Pairing
                </div>
                <p className="text-xs text-[#9e97af] mt-1 max-w-xs">
                  Optimal color temperature alignment enhances facial glow without casting grayish or yellow shadows.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] font-bold text-[#9e97af] uppercase">
                Harmony Score
              </span>
              <span className="text-2xl font-display font-bold text-[#dfb098]">
                98.4%
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                Lighting Calibrated
              </span>
            </div>
          </div>

          {/* Dissonance / Colors to Avoid (Anti-Harmonies) */}
          <div className="p-3.5 rounded-2xl bg-[#161220] border border-rose-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                Colors to Avoid:
              </span>
              <div className="flex items-center gap-1.5">
                {selectedProfile.avoidPalette.map((av, avIdx) => (
                  <div
                    key={avIdx}
                    className="w-5 h-5 rounded-md border border-white/20"
                    style={{ backgroundColor: av.hex }}
                    title={`${av.name}: ${av.reason}`}
                  />
                ))}
              </div>
            </div>
            <span className="text-[11px] text-[#9e97af]">
              {selectedProfile.avoidPalette[0].name} ({selectedProfile.avoidPalette[0].reason})
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
