import { Flame, BookOpen, ChevronRight, Play, Gift, Shirt } from "lucide-react";
import { useMemo, useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { LivingOlee } from "./LivingOlee";
import { OLEE_DREAMS, OLEE_GIFTS, GIFT_LABEL, moodForTime, OleeMood } from "./OleeContent";

interface Props {
  onStart: () => void;
  onStories: () => void;
  onWardrobe: () => void;
  tab: "today" | "progress" | "settings";
  setTab: (t: "today" | "progress" | "settings") => void;
}

const ADVENTURES = [
  { icon: "🔍", t: "Mystery hunt", s: "Find a word you've never seen before!" },
  { icon: "🎭", t: "Character day", s: "Pick your favorite character and be them" },
  { icon: "😮", t: "Surprise seeker", s: "Look for something unexpected" },
  { icon: "🌈", t: "Imagination spark", s: "What would YOU do in this story?" },
];

// Garden items earned so far (mocked progress)
const FLOWERS = [
  { x: 14, color: "#ED93B1" }, { x: 28, color: "#FAC775" },
  { x: 46, color: "#C58AD9" }, { x: 70, color: "#85B7EB" },
  { x: 86, color: "#F5C4B3" },
];
const FRIENDS = [
  { kind: "ladybug", x: 22, y: 60 },
  { kind: "butterfly", x: 78, y: 28 },
  { kind: "mushroom", x: 6, y: 50 },
];

export const GardenToday = ({ onStart, onStories, onWardrobe, tab, setTab }: Props) => {
  const [giftOpen, setGiftOpen] = useState(false);
  const [giftTaken, setGiftTaken] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [showNewBook, setShowNewBook] = useState(false);

  const hour = new Date().getHours();
  const hasReadToday = false;
  const mood: OleeMood = moodForTime(hour, hasReadToday);
  const childName = "Aarav";
  const streak = 13;
  const lastBook = "Charlotte's Web";

  const dream = useMemo(() => OLEE_DREAMS[new Date().getDate() % OLEE_DREAMS.length], []);
  const gift = useMemo(() => OLEE_GIFTS[new Date().getDate() % OLEE_GIFTS.length], []);
  const adv = ADVENTURES[new Date().getDate() % ADVENTURES.length];

  // Sky gradient based on time
  const sky =
    mood === "night"
      ? "linear-gradient(to bottom, #2D3B4E 0%, #4A5A78 60%, #c8d4d8 100%)"
      : mood === "cozy"
      ? "linear-gradient(to bottom, #F5D5B5 0%, #FCE3DD 30%, #e4f3eb 70%, #d4e8c4 100%)"
      : mood === "sleepy"
      ? "linear-gradient(to bottom, #FCE9D2 0%, #e4f3eb 40%, #d4e8c4 100%)"
      : "linear-gradient(to bottom, #d4f0e4 0%, #e8f4ef 35%, #d4e8c4 70%, #c4dca0 100%)";

  // Speech bubble copy
  let bubbleTitle = `Hi ${childName}! 👋`;
  let bubbleBody = "";
  if (mood === "sleepy") {
    bubbleTitle = `Good morning, ${childName}!`;
    bubbleBody = `💤 ${dream}`;
  } else if (mood === "hopeful") {
    bubbleBody = `Ready when you are!`;
  } else if (mood === "cozy") {
    bubbleBody = `Perfect time for a story!`;
  } else if (mood === "night") {
    bubbleTitle = `Zzz...`;
    bubbleBody = `sweet dreams, ${childName}`;
  }

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden" style={{ background: sky }}>
      {/* === SKY === */}
      {mood !== "night" ? (
        <>
          <div className="absolute top-6 left-10 w-20 h-6 rounded-full bg-white/75 animate-drift-slow" />
          <div className="absolute top-14 right-8 w-14 h-5 rounded-full bg-white/70 animate-drift" />
          <div className="absolute top-3 right-16 w-9 h-9 rounded-full bg-gradient-to-br from-yellow-200 to-amber-300 opacity-90" />
        </>
      ) : (
        <>
          <div className="absolute top-4 right-10 w-10 h-10 rounded-full bg-gray-100 shadow-[inset_-6px_-2px_0_#d4d4d4]" />
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white animate-twinkle"
              style={{
                top: `${10 + (i * 7) % 35}%`,
                left: `${(i * 37) % 90 + 5}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </>
      )}

      {/* === HEADER badges === */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-1 bg-white/85 backdrop-blur-sm rounded-xl px-2.5 py-1 shadow-sm">
        <Flame size={11} className="text-accent" fill="currentColor" />
        <span className="text-[13px] font-extrabold" style={{ color: "#854F0B" }}>{streak}</span>
        <span className="text-[9px] font-bold" style={{ color: "#BA7517" }}>days</span>
      </div>
      <button
        onClick={onWardrobe}
        className="absolute top-3 right-3 z-30 bg-white/85 backdrop-blur-sm rounded-xl p-2 shadow-sm active:scale-95"
        aria-label="Wardrobe"
      >
        <Shirt size={14} style={{ color: "#5BAF85" }} />
      </button>

      {/* === GARDEN ground === */}
      <svg className="absolute bottom-0 left-0 w-full h-[58%]" viewBox="0 0 360 440" preserveAspectRatio="none">
        {/* hills */}
        <ellipse cx="50" cy="80" rx="180" ry="70" fill="#b8dba0" opacity="0.85" />
        <ellipse cx="310" cy="90" rx="180" ry="70" fill="#a8d090" opacity="0.85" />
        {/* ground */}
        <path d="M0 140 Q180 110 360 140 L360 440 L0 440 Z" fill="#d4e8c4" />
        <path d="M0 200 Q180 175 360 200 L360 440 L0 440 Z" fill="#c4dca0" />
        {/* row 3 - birdhouse */}
        <g transform="translate(295 135)">
          <rect x="-2" y="0" width="4" height="40" fill="#8b6f5e" />
          <rect x="-12" y="-20" width="24" height="22" rx="2" fill="#E8836B" />
          <path d="M-14 -20 L0 -32 L14 -20 Z" fill="#5BAF85" />
          <circle cx="0" cy="-9" r="4" fill="#2D5A45" />
        </g>
      </svg>

      {/* Row 2 — decorations */}
      {FRIENDS.map((f, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${f.x}%`, bottom: `${f.y}%` }}
        >
          {f.kind === "mushroom" && (
            <svg width="26" height="28" viewBox="0 0 26 28">
              <ellipse cx="13" cy="20" rx="6" ry="6" fill="#FDFCF9" />
              <path d="M2 14 Q13 0 24 14 Z" fill="#E8836B" />
              <circle cx="9" cy="10" r="1.8" fill="#FDFCF9" />
              <circle cx="16" cy="11" r="1.5" fill="#FDFCF9" />
            </svg>
          )}
          {f.kind === "ladybug" && (
            <svg width="22" height="16" viewBox="0 0 22 16" className="animate-float">
              <ellipse cx="11" cy="9" rx="9" ry="7" fill="#E8836B" />
              <path d="M11 2 Q11 16 11 16" stroke="#2D5A45" strokeWidth="1.5" />
              <circle cx="6" cy="7" r="1.3" fill="#2D5A45" />
              <circle cx="6" cy="11" r="1.3" fill="#2D5A45" />
              <circle cx="15" cy="7" r="1.3" fill="#2D5A45" />
              <circle cx="15" cy="11" r="1.3" fill="#2D5A45" />
              <circle cx="11" cy="3" r="2" fill="#2D5A45" />
            </svg>
          )}
          {f.kind === "butterfly" && (
            <svg width="22" height="18" viewBox="0 0 22 18" className="animate-butterfly">
              <ellipse cx="7" cy="8" rx="6" ry="7" fill="#C58AD9" opacity="0.9" />
              <ellipse cx="15" cy="8" rx="6" ry="7" fill="#85B7EB" opacity="0.9" />
              <ellipse cx="11" cy="9" rx="1.2" ry="5" fill="#2D5A45" />
            </svg>
          )}
        </div>
      ))}

      {/* Row 1 — flowers (foreground arc) */}
      <div className="absolute bottom-[18%] left-0 right-0 flex justify-around items-end px-3 pointer-events-none">
        {FLOWERS.map((f, i) => (
          <svg key={i} width="22" height="44" viewBox="0 0 22 44" className="animate-sway" style={{ animationDelay: `${i * 0.3}s` }}>
            <line x1="11" y1="44" x2="11" y2="16" stroke="#5BAF85" strokeWidth="2" />
            <ellipse cx="6" cy="22" rx="3" ry="5" fill="#5BAF85" transform="rotate(-30 6 22)" />
            <circle cx="11" cy="11" r="8" fill={f.color} />
            <circle cx="11" cy="11" r="3" fill="#FFF3E0" />
          </svg>
        ))}
      </div>

      {/* === Olee + speech bubble (center) === */}
      <div className="absolute top-[18%] left-0 right-0 flex items-end justify-center gap-1 pointer-events-none">
        {/* Speech bubble */}
        <div
          className="relative bg-white/95 px-3 py-2 max-w-[150px] shadow-[0_2px_10px_rgba(45,90,69,0.12)] mb-10 pointer-events-auto"
          style={{ borderRadius: "16px 16px 4px 16px" }}
        >
          <p className="text-[13px] font-extrabold leading-tight" style={{ color: "#2D5A45" }}>
            {bubbleTitle}
          </p>
          {bubbleBody && (
            <p className="text-[11px] italic font-semibold leading-snug mt-0.5" style={{ color: "#5BAF85" }}>
              {bubbleBody}
            </p>
          )}
        </div>

        {/* Olee — tap for wardrobe */}
        <button onClick={onWardrobe} className="pointer-events-auto -ml-1" aria-label="Open wardrobe">
          <LivingOlee mood={mood} size={120} />
        </button>

        {/* Daily Gift sparkle */}
        {!giftTaken && (
          <button
            onClick={() => setGiftOpen(true)}
            className="pointer-events-auto absolute right-6 bottom-2 w-12 h-12 rounded-full flex items-center justify-center animate-pulse"
            style={{ background: "radial-gradient(circle, #FFE89A 0%, #EF9F27 100%)", boxShadow: "0 0 22px rgba(239,159,39,0.6)" }}
            aria-label="Today's gift"
          >
            <Gift size={20} className="text-white" />
            <span className="absolute -top-1 -right-1 text-sm animate-twinkle">✨</span>
          </button>
        )}
      </div>

      {/* === BOTTOM action cluster === */}
      <div className="absolute bottom-16 left-0 right-0 px-3 space-y-2 z-20">
        {/* Mission */}
        <div
          className="relative rounded-xl px-3 py-2 flex items-center gap-2 bg-white/85 backdrop-blur-sm"
          style={{ border: "2px dashed #B5E4CC" }}
        >
          <span
            className="absolute -top-2 right-3 text-white text-[8px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: "#5BAF85" }}
          >
            Secret mission!
          </span>
          <div className="text-[22px] leading-none shrink-0">{adv.icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-extrabold leading-tight" style={{ color: "#2D5A45" }}>{adv.t}</p>
            <p className="text-[10px] font-medium leading-snug" style={{ color: "#6aa" }}>{adv.s}</p>
          </div>
        </div>

        {/* Continue reading */}
        <div className="rounded-2xl p-2.5 bg-white/95 backdrop-blur-sm shadow-md flex items-center gap-2.5">
          <div
            className="w-10 h-12 rounded-md flex items-center justify-center text-base shrink-0"
            style={{ background: "#FCEFD2", border: "1.5px solid #ECC88A" }}
          >
            📖
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: "#888" }}>Continue</p>
            <p className="text-[13px] font-extrabold leading-tight truncate" style={{ color: "#2D5A45" }}>{lastBook}</p>
            <p className="text-[10px] font-semibold" style={{ color: "#5BAF85" }}>Tap to grow your garden!</p>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-extrabold shrink-0"
            style={{ background: "#FFF3E0", border: "2px dashed #EF9F27", color: "#EF9F27" }}
            title="Mystery unlock!"
          >
            ?
          </div>
          <button
            onClick={onStart}
            className="relative w-11 h-11 rounded-full flex items-center justify-center shrink-0 active:scale-95 transition"
            style={{ background: "#5BAF85" }}
          >
            <span className="absolute inset-0 -m-1 rounded-full animate-play-ring pointer-events-none"
              style={{ border: "2px solid #B5E4CC" }} />
            <Play size={16} fill="white" className="text-white ml-0.5" />
          </button>
        </div>

        {/* Story corner + new book */}
        <div className="flex items-center justify-between text-[11px]">
          <button onClick={onStories} className="flex items-center gap-1 bg-white/70 px-2 py-1 rounded-lg active:scale-95">
            <BookOpen size={12} style={{ color: "#7F77DD" }} />
            <span className="font-bold" style={{ color: "#2D5A45" }}>Olee's stories</span>
            <ChevronRight size={10} style={{ color: "#999" }} />
          </button>
          <button onClick={() => setShowNewBook(v => !v)} className="font-bold" style={{ color: "#5BAF85" }}>
            New book?
          </button>
        </div>
        {showNewBook && (
          <input
            autoFocus
            placeholder="Type the new book name..."
            className="w-full bg-white border-2 border-dashed rounded-xl px-3 py-1.5 text-xs font-semibold outline-none"
            style={{ borderColor: "#B5E4CC", color: "#2D5A45" }}
          />
        )}
      </div>

      {/* === Daily Gift modal === */}
      {giftOpen && (
        <div className="absolute inset-0 z-40 flex items-end justify-center bg-black/30 animate-fade-in">
          <div className="w-full bg-white rounded-t-[24px] p-4 pb-6 animate-slide-in-right" style={{ animation: "fade-in 0.3s ease-out" }}>
            <div className="flex justify-center -mt-2 mb-2">
              <LivingOlee
                mood={gift.kind === "joke" ? "laughing" : gift.kind === "riddle" ? "thinking" : gift.kind === "fact" ? "surprised" : "glowing"}
                size={90}
              />
            </div>
            <p className="text-center text-[10px] font-bold tracking-wider mb-1" style={{ color: "#EF9F27" }}>
              {GIFT_LABEL[gift.kind]}
            </p>
            <p className="text-center text-[16px] font-extrabold leading-snug px-2" style={{ color: "#2D5A45" }}>
              {gift.text}
            </p>
            {gift.kind === "riddle" && (
              <div className="text-center mt-3">
                {showAns ? (
                  <p className="text-[15px] font-bold" style={{ color: "#5BAF85" }}>{gift.answer}</p>
                ) : (
                  <button
                    onClick={() => setShowAns(true)}
                    className="text-[12px] font-bold px-3 py-1 rounded-full bg-accent-soft"
                    style={{ color: "#EF9F27" }}
                  >
                    Show answer
                  </button>
                )}
              </div>
            )}
            <button
              onClick={() => { setGiftOpen(false); setGiftTaken(true); setShowAns(false); }}
              className="mt-4 w-full bg-primary text-white py-3 rounded-2xl font-extrabold text-[14px] active:scale-[0.98]"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
};

export default GardenToday;
