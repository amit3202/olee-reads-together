import { useEffect, useState } from "react";
import { LivingOlee } from "./LivingOlee";

interface Props {
  onGarden: () => void;
  onKeepReading: () => void;
}

const POOL = [
  { name: "Sunflower", cat: "Garden Flower", emoji: "🌻", rarity: "common" },
  { name: "Ladybug", cat: "Garden Friend", emoji: "🐞", rarity: "uncommon" },
  { name: "Reading Glasses", cat: "Olee's Wardrobe", emoji: "👓", rarity: "uncommon" },
  { name: "Top Hat", cat: "Olee's Wardrobe", emoji: "🎩", rarity: "uncommon" },
  { name: "Tiny Pond", cat: "Garden Special", emoji: "🪷", rarity: "rare" },
  { name: "Rainbow", cat: "Garden Special", emoji: "🌈", rarity: "rare" },
  { name: "Mushroom", cat: "Garden Decoration", emoji: "🍄", rarity: "common" },
];

export const UnlockReveal = ({ onGarden, onKeepReading }: Props) => {
  const [stage, setStage] = useState<"anticipate" | "reveal">("anticipate");
  const [item] = useState(() => POOL[Math.floor(Math.random() * POOL.length)]);

  useEffect(() => {
    const t = setTimeout(() => setStage("reveal"), 1800);
    return () => clearTimeout(t);
  }, []);

  const rarityColor = item.rarity === "rare" ? "#C58AD9" : item.rarity === "uncommon" ? "#EF9F27" : "#5BAF85";

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between relative overflow-hidden"
      style={{ background: "radial-gradient(circle at 50% 35%, #3a4d6e 0%, #1a2540 80%)" }}
      onClick={() => stage === "anticipate" && setStage("reveal")}
    >
      {/* Twinkling stars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white animate-twinkle"
          style={{ top: `${(i * 41) % 90}%`, left: `${(i * 23) % 95}%`, animationDelay: `${i * 0.15}s` }}
        />
      ))}

      <div className="pt-16 z-10 text-center px-6">
        {stage === "anticipate" ? (
          <>
            <p className="text-[24px] font-extrabold mb-2" style={{ color: "#F4C542", textShadow: "0 2px 12px rgba(239,159,39,0.5)" }}>
              You unlocked something!
            </p>
            <p className="text-[13px] font-bold text-white/70">Tap to reveal</p>
          </>
        ) : (
          <>
            <p className="text-[12px] font-bold tracking-widest uppercase mb-1" style={{ color: rarityColor }}>
              {item.rarity}
            </p>
            <p className="text-[26px] font-extrabold text-white leading-tight">
              {item.name}!
            </p>
            <p className="text-[12px] font-semibold text-white/60 mt-1">{item.cat}</p>
          </>
        )}
      </div>

      {/* Chest / Item */}
      <div className="relative flex-1 flex items-center justify-center w-full">
        {stage === "anticipate" ? (
          <div className="animate-float">
            <div
              className="w-32 h-28 rounded-2xl flex items-center justify-center relative"
              style={{
                background: "linear-gradient(180deg, #8b5a2b 0%, #6b3e1a 100%)",
                boxShadow: "0 0 60px rgba(239,159,39,0.5)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-10 rounded-t-2xl" style={{ background: "linear-gradient(180deg, #a0703a 0%, #7a4e25 100%)" }} />
              <div className="absolute top-9 left-0 right-0 h-1 bg-amber-900" />
              <div className="absolute top-9 left-1/2 -translate-x-1/2 w-6 h-7 rounded-b-md" style={{ background: "#F4C542" }} />
              {/* sparkles */}
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="absolute text-xl animate-twinkle"
                  style={{
                    top: `${-20 + (i * 15) % 30}px`,
                    left: `${10 + i * 20}px`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >✨</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative animate-pop flex flex-col items-center">
            <div
              className="w-40 h-40 rounded-full flex items-center justify-center text-[88px]"
              style={{
                background: `radial-gradient(circle, ${rarityColor}40 0%, transparent 70%)`,
                boxShadow: `0 0 80px ${rarityColor}80`,
              }}
            >
              {item.emoji}
            </div>
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="absolute text-lg animate-twinkle"
                style={{
                  top: `${30 + (i * 30) % 120}px`,
                  left: `${(i * 50) % 200}px`,
                  animationDelay: `${i * 0.18}s`,
                }}
              >✨</span>
            ))}
          </div>
        )}

        {/* Olee on the side */}
        <div className="absolute right-3 bottom-2">
          <LivingOlee mood="glowing" size={80} />
        </div>
      </div>

      {/* Actions */}
      {stage === "reveal" && (
        <div className="w-full px-5 pb-6 z-10 space-y-2 animate-fade-in">
          <p className="text-center text-[12px] text-white/80 font-semibold mb-2">
            Added to your garden!
          </p>
          <button
            onClick={onGarden}
            className="w-full bg-primary text-white py-3.5 rounded-2xl font-extrabold text-[15px] active:scale-[0.98]"
          >
            See your garden!
          </button>
          <button
            onClick={onKeepReading}
            className="w-full bg-transparent border-2 border-white/40 text-white py-3 rounded-2xl font-bold text-[13px] active:scale-[0.98]"
          >
            Keep reading for more!
          </button>
        </div>
      )}
    </div>
  );
};

export default UnlockReveal;
