import { useState } from "react";
import { Flame, Play, ChevronRight, BookOpen } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

interface Props {
  onStart: () => void;
  onStories: () => void;
  tab: "today" | "progress" | "settings";
  setTab: (t: "today" | "progress" | "settings") => void;
}

const ADVENTURES = [
  { icon: "🔍", t: "Mystery hunt", s: "Find a word you've never seen before!" },
  { icon: "🎭", t: "Character day", s: "Pick your favorite character and be them" },
  { icon: "😮", t: "Surprise seeker", s: "Look for something unexpected in the story" },
  { icon: "🌈", t: "Imagination spark", s: "What would YOU do if you were in this story?" },
  { icon: "💬", t: "Quote catcher", s: "Find a sentence that sounds really cool" },
  { icon: "👀", t: "Detail detective", s: "Notice something small others might miss" },
];

const WEEK_COLORS = ["#ED93B1", "#FAC775", "#C58AD9", "#85B7EB", "#F5C4B3"];

const TodayV2 = ({ onStart, onStories, tab, setTab }: Props) => {
  const adv = ADVENTURES[new Date().getDate() % ADVENTURES.length];
  const childName = "Aarav";
  const streak = 13;
  const weekDone = 3;
  const lastBook = "Charlotte's Web";
  const chapterHint = "Chapter 3 — keep going!";
  const yesterdayFlower = { emoji: "🌻", name: "sunflower" };
  const [showNewBook, setShowNewBook] = useState(false);

  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #d4f0e4 0%, #e4f3eb 25%, #f0f5e8 45%, #f8f5ed 60%, #FDFCF9 100%)",
      }}
    >
      {/* SECTION 1 — Olee's world */}
      <div className="relative h-[220px] shrink-0">
        {/* Streak badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-xl px-2.5 py-1 shadow-sm">
          <Flame size={11} className="text-accent" fill="currentColor" />
          <span className="text-[13px] font-extrabold" style={{ color: "#854F0B" }}>{streak}</span>
          <span className="text-[9px] font-bold" style={{ color: "#BA7517" }}>days</span>
        </div>

        {/* Clouds */}
        <div className="absolute top-5 left-12 w-16 h-5 rounded-full bg-white/70 animate-drift-slow" />
        <div className="absolute top-10 right-10 w-12 h-4 rounded-full bg-white/70 animate-drift" />

        {/* Decorative leaves */}
        <div className="absolute top-16 left-1 text-2xl opacity-50 animate-float">🍃</div>
        <div className="absolute top-24 right-2 text-xl opacity-50 animate-float" style={{ animationDelay: "1s" }}>🍃</div>

        {/* Butterfly */}
        <svg className="absolute top-12 left-[42%] animate-butterfly" width="22" height="18" viewBox="0 0 22 18">
          <ellipse cx="7" cy="8" rx="6" ry="7" fill="#C58AD9" opacity="0.85" />
          <ellipse cx="15" cy="8" rx="6" ry="7" fill="#85B7EB" opacity="0.85" />
          <ellipse cx="11" cy="9" rx="1.2" ry="5" fill="#2D5A45" />
        </svg>

        {/* Hills */}
        <svg className="absolute bottom-0 left-0 w-full h-[110px]" viewBox="0 0 360 110" preserveAspectRatio="none">
          <ellipse cx="60" cy="120" rx="160" ry="80" fill="#b8dba0" />
          <ellipse cx="280" cy="125" rx="170" ry="80" fill="#c8e4a8" />
          <ellipse cx="180" cy="135" rx="220" ry="80" fill="#d0e8b4" />
        </svg>

        {/* Tiny flowers in hills */}
        <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-around items-end pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} width="14" height="28" viewBox="0 0 14 28">
              <line x1="7" y1="28" x2="7" y2="10" stroke="#5BAF85" strokeWidth="1.5" />
              <circle cx="7" cy="7" r="5" fill={WEEK_COLORS[i]} />
              <circle cx="7" cy="7" r="1.5" fill="#FFF3E0" />
            </svg>
          ))}
        </div>

        {/* Olee + speech bubble */}
        <div className="absolute inset-0 flex items-end justify-center pb-2 pl-2 pr-3 gap-2">
          {/* Olee */}
          <svg viewBox="0 0 200 220" width="90" height="99" className="shrink-0 drop-shadow-sm">
            <ellipse cx="100" cy="208" rx="56" ry="6" fill="#2D5A45" opacity="0.1" />
            <path d="M100 38 C 100 24, 100 12, 100 6" stroke="#2D5A45" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M100 18 C 88 14, 80 18, 78 28 C 88 30, 96 26, 100 18 Z" fill="#2D5A45" />
            <path d="M100 24 C 112 20, 120 24, 122 34 C 112 36, 104 32, 100 24 Z" fill="#3a6e58" />
            <ellipse cx="100" cy="120" rx="78" ry="78" fill="#8AD4B0" />
            <ellipse cx="100" cy="128" rx="42" ry="50" fill="#FDFCF9" />
            <g stroke="#2D5A45" strokeWidth="4" strokeLinecap="round" fill="none">
              <line x1="100" y1="108" x2="100" y2="156" />
              <line x1="100" y1="124" x2="86" y2="116" />
              <line x1="100" y1="124" x2="114" y2="116" />
            </g>
            <ellipse cx="58" cy="128" rx="8" ry="5" fill="#F4A89B" opacity="0.75" />
            <ellipse cx="142" cy="128" rx="8" ry="5" fill="#F4A89B" opacity="0.75" />
            <ellipse cx="72" cy="108" rx="7" ry="9" fill="#2D5A45" />
            <ellipse cx="128" cy="108" rx="7" ry="9" fill="#2D5A45" />
            <circle cx="74" cy="105" r="2.2" fill="#fff" />
            <circle cx="130" cy="105" r="2.2" fill="#fff" />
            <ellipse cx="100" cy="142" rx="6" ry="5" fill="#E8836B" />
            {/* Left arm static */}
            <ellipse cx="30" cy="140" rx="14" ry="18" fill="#8AD4B0" transform="rotate(-20 30 140)" />
            {/* Right arm waving */}
            <g style={{ transformOrigin: "170px 110px" }} className="animate-wave">
              <ellipse cx="170" cy="100" rx="14" ry="18" fill="#8AD4B0" />
            </g>
            <ellipse cx="76" cy="200" rx="14" ry="8" fill="#6dbf95" />
            <ellipse cx="124" cy="200" rx="14" ry="8" fill="#6dbf95" />
          </svg>

          {/* Speech bubble */}
          <div
            className="relative bg-white px-3 py-2 mb-6 max-w-[155px] shadow-[0_2px_8px_rgba(45,90,69,0.08)]"
            style={{ borderRadius: "16px 16px 16px 4px" }}
          >
            <p className="text-[15px] font-extrabold leading-tight" style={{ color: "#2D5A45" }}>
              Hi {childName}! 👋
            </p>
            <p className="text-[11px] font-semibold leading-snug mt-0.5" style={{ color: "#5BAF85" }}>
              You grew a beautiful {yesterdayFlower.name} yesterday!
            </p>
            <p className="text-[10px] font-semibold leading-snug mt-0.5" style={{ color: "#EF9F27" }}>
              {yesterdayFlower.emoji} Ready for another one?
            </p>
          </div>
        </div>

        {/* Week progress flowers — bottom-left of world */}
        <div className="absolute bottom-1 left-3 flex items-end gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} width="10" height="16" viewBox="0 0 10 16" style={{ opacity: i < weekDone ? 1 : 0.25 }}>
              <line x1="5" y1="16" x2="5" y2="8" stroke="#5BAF85" strokeWidth="1.2" />
              <circle cx="5" cy="5" r="3.5" fill={i < weekDone ? WEEK_COLORS[i] : "#bbb"} />
            </svg>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-24 flex-1 overflow-y-auto scrollbar-hide -mt-2 space-y-3">
        {/* SECTION 2 — Secret mission */}
        <div
          className="relative rounded-2xl p-3 flex items-center gap-3"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "2px dashed #B5E4CC",
          }}
        >
          <span
            className="absolute -top-2 right-3 text-white text-[9px] font-bold px-2 py-0.5 rounded-lg"
            style={{ background: "#5BAF85" }}
          >
            Secret mission!
          </span>
          <div className="text-[30px] leading-none shrink-0">{adv.icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold" style={{ color: "#5BAF85" }}>Olee's secret mission</p>
            <p className="text-[14px] font-extrabold leading-tight" style={{ color: "#2D5A45" }}>{adv.t}</p>
            <p className="text-[11px] font-medium leading-snug" style={{ color: "#6aa" }}>{adv.s}</p>
          </div>
        </div>

        {/* SECTION 3 — Continue reading */}
        <div
          className="rounded-[18px] p-3"
          style={{ background: "rgba(255,255,255,0.9)", border: "2px solid #E1F5EE" }}
        >
          <div className="flex items-center gap-3">
            {/* Book icon */}
            <div
              className="w-[42px] h-[52px] rounded-lg flex items-center justify-center text-lg shrink-0"
              style={{ background: "#FCEFD2", border: "1.5px solid #ECC88A" }}
            >
              📖
            </div>
            {/* Middle */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold" style={{ color: "#888" }}>Continue reading</p>
              <p className="text-[15px] font-extrabold leading-tight truncate" style={{ color: "#2D5A45" }}>{lastBook}</p>
              <p className="text-[11px] font-semibold" style={{ color: "#5BAF85" }}>{chapterHint}</p>
            </div>
            {/* Mystery flower */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[16px] font-extrabold shrink-0"
              style={{ background: "#FFF3E0", border: "2px dashed #EF9F27", color: "#EF9F27" }}
            >
              ?
            </div>
            {/* Play */}
            <button
              onClick={onStart}
              className="relative w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0 active:scale-95 transition"
              style={{ background: "#5BAF85" }}
              aria-label="Start reading"
            >
              <span
                className="absolute inset-0 -m-1 rounded-full animate-play-ring pointer-events-none"
                style={{ border: "2px solid #B5E4CC" }}
              />
              <Play size={16} fill="white" className="text-white ml-0.5" />
            </button>
          </div>
        </div>

        {/* Action text */}
        <p className="text-center text-[13px] font-extrabold" style={{ color: "#2D5A45" }}>
          Tap play to <span style={{ color: "#5BAF85" }}>make your garden grow!</span>
        </p>

        {/* Reading something new */}
        <div className="text-center">
          <button
            onClick={() => setShowNewBook((v) => !v)}
            className="text-[12px] font-bold"
            style={{ color: "#5BAF85" }}
          >
            Reading something new? Tap here
          </button>
          {showNewBook && (
            <input
              autoFocus
              placeholder="Type the new book name..."
              className="mt-2 w-full bg-white/80 border-2 border-dashed rounded-xl px-3 py-2 text-sm font-semibold outline-none"
              style={{ borderColor: "#B5E4CC", color: "#2D5A45" }}
            />
          )}
        </div>

        {/* SECTION 4 — Story corner */}
        <button
          onClick={onStories}
          className="w-full rounded-[14px] px-3 py-2.5 flex items-center gap-3 active:scale-[0.99] transition"
          style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid #E8E0F5" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "#F0ECF8" }}
          >
            <BookOpen size={16} style={{ color: "#7F77DD" }} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[12px] font-bold" style={{ color: "#2D5A45" }}>Olee's story corner</p>
            <p className="text-[10px]" style={{ color: "#999" }}>Pick a tale with Olee</p>
          </div>
          <ChevronRight size={14} style={{ color: "#ccc" }} strokeWidth={3} />
        </button>
      </div>

      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
};

export default TodayV2;
