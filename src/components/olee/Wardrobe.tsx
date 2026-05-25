import { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { LivingOlee } from "./LivingOlee";

interface Props {
  onBack: () => void;
}

type Category = "hats" | "glasses" | "neck" | "special";
type Acc = "tophat" | "glasses" | "bowtie" | "scarf" | "crown" | "wizardhat" | null;

const ITEMS: Record<Category, { id: Acc; name: string; emoji: string; unlocked: boolean }[]> = {
  hats: [
    { id: "tophat", name: "Top hat", emoji: "🎩", unlocked: true },
    { id: "crown", name: "Crown", emoji: "👑", unlocked: true },
    { id: "wizardhat", name: "Wizard hat", emoji: "🧙", unlocked: false },
    { id: null, name: "Beanie", emoji: "🧢", unlocked: false },
  ],
  glasses: [
    { id: "glasses", name: "Reading glasses", emoji: "👓", unlocked: true },
    { id: null, name: "Round specs", emoji: "🤓", unlocked: false },
    { id: null, name: "Sunglasses", emoji: "🕶️", unlocked: false },
  ],
  neck: [
    { id: "bowtie", name: "Bow tie", emoji: "🎀", unlocked: true },
    { id: "scarf", name: "Blue scarf", emoji: "🧣", unlocked: true },
    { id: null, name: "Necklace", emoji: "📿", unlocked: false },
  ],
  special: [
    { id: null, name: "Star pin", emoji: "⭐", unlocked: false },
    { id: null, name: "Flower pin", emoji: "🌼", unlocked: false },
    { id: null, name: "Cape", emoji: "🦸", unlocked: false },
  ],
};

const TABS: { id: Category; label: string }[] = [
  { id: "hats", label: "Hats" },
  { id: "glasses", label: "Glasses" },
  { id: "neck", label: "Neckwear" },
  { id: "special", label: "Special" },
];

export const Wardrobe = ({ onBack }: Props) => {
  const [cat, setCat] = useState<Category>("hats");
  const [equipped, setEquipped] = useState<Acc>(null);

  const items = ITEMS[cat];
  const unlockedCount = items.filter(i => i.unlocked).length;

  return (
    <div className="w-full h-full flex flex-col" style={{ background: "linear-gradient(to bottom, #F0FAF4 0%, #FDFCF9 100%)" }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center active:scale-95">
          <ArrowLeft size={16} style={{ color: "#2D5A45" }} />
        </button>
        <h2 className="text-[18px] font-extrabold" style={{ color: "#2D5A45" }}>Olee's wardrobe</h2>
      </div>

      {/* Olee preview on platform */}
      <div className="flex justify-center pt-2 pb-3 relative">
        <div className="absolute bottom-2 w-44 h-6 rounded-full bg-primary/15 blur-sm" />
        <LivingOlee mood="glowing" size={150} accessory={equipped} />
      </div>

      {/* Category tabs */}
      <div className="px-3 pt-1">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setCat(t.id)}
              className="px-3 py-1.5 rounded-full text-[12px] font-extrabold shrink-0 active:scale-95"
              style={{
                background: cat === t.id ? "#5BAF85" : "rgba(255,255,255,0.8)",
                color: cat === t.id ? "#fff" : "#2D5A45",
                border: cat === t.id ? "none" : "1.5px solid #E1F5EE",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="text-[10px] font-bold mt-1.5" style={{ color: "#5BAF85" }}>
          {unlockedCount} / {items.length} collected
        </p>
      </div>

      {/* Grid */}
      <div className="flex-1 px-3 pt-2 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-3 gap-2">
          {items.map((it, i) => {
            const active = it.unlocked && it.id === equipped;
            return (
              <button
                key={i}
                onClick={() => it.unlocked && setEquipped(active ? null : it.id)}
                className="aspect-square rounded-2xl flex flex-col items-center justify-center text-[34px] relative active:scale-95 transition"
                style={{
                  background: it.unlocked ? "#fff" : "rgba(45,90,69,0.85)",
                  border: active ? "2.5px solid #5BAF85" : "1.5px solid #E1F5EE",
                  opacity: it.unlocked ? 1 : 1,
                }}
                disabled={!it.unlocked}
              >
                {it.unlocked ? (
                  <>
                    <span>{it.emoji}</span>
                    <span className="text-[9px] font-bold mt-0.5" style={{ color: "#2D5A45" }}>{it.name}</span>
                  </>
                ) : (
                  <>
                    <Lock size={20} className="text-white/70" />
                    <span className="text-[10px] font-extrabold text-white/80 mt-1">?</span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-4 py-3 space-y-2">
        <button
          onClick={onBack}
          className="w-full bg-primary text-white py-3 rounded-2xl font-extrabold text-[14px] active:scale-[0.98]"
        >
          Save outfit
        </button>
        <button
          onClick={() => setEquipped(null)}
          className="w-full text-[11px] font-bold py-1"
          style={{ color: "#888" }}
        >
          Remove all
        </button>
      </div>
    </div>
  );
};

export default Wardrobe;
