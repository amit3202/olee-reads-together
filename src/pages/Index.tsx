import { useState } from "react";
import { Olee } from "@/components/Olee";
import { BottomNav } from "@/components/BottomNav";
import {
  ArrowRight, ArrowLeft, Camera, Play, Pause, Flame, Star, BookOpen,
  CheckCircle2, ChevronRight, ShieldCheck, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Screen =
  | "splash" | "welcome" | "setup1" | "setup2" | "today"
  | "timer" | "celebrate" | "progress" | "stories" | "story" | "missed";

export type Story = {
  t: string; time: number; moral: string; age: string;
  bg: string; icon: string; summary: string; chars: string[]; lesson: string;
};

const STORIES: Story[] = [
  {
    t: "The lion and the mouse", time: 5, moral: "Kindness", age: "4-6",
    bg: "#FCE3DD", icon: "#E8836B",
    summary: "A tiny mouse promises to help a mighty lion one day. When the lion is caught in a hunter's net, the little mouse remembers — and chews him free.",
    chars: ["Lion", "Mouse", "Hunter"],
    lesson: "Even the smallest friend can make the biggest difference.",
  },
  {
    t: "The thirsty crow", time: 4, moral: "Cleverness", age: "4-6",
    bg: "#DDEAF7", icon: "#7AB8D9",
    summary: "On a hot day, a thirsty crow finds a pot with just a little water at the bottom. He thinks, then drops pebbles in one by one until the water rises.",
    chars: ["Crow", "Pebbles", "Pot"],
    lesson: "A clever idea is better than giving up.",
  },
  {
    t: "The boy who cried wolf", time: 6, moral: "Honesty", age: "5-7",
    bg: "#DEF1E5", icon: "#5BAF85",
    summary: "A young shepherd boy tricks his village by shouting 'Wolf!' just for fun. When a real wolf finally comes, no one believes him.",
    chars: ["Shepherd boy", "Villagers", "Wolf"],
    lesson: "When we tell the truth, people trust us.",
  },
  {
    t: "The golden goose", time: 7, moral: "Generosity", age: "7-9",
    bg: "#FCEFD2", icon: "#EF9F27",
    summary: "A kind young man shares his last piece of bread with an old stranger. In return, he is given a goose with golden feathers — and a magical adventure begins.",
    chars: ["Dummling", "Old man", "Golden goose"],
    lesson: "Kindness shared comes back many times over.",
  },
];

const PHONE = "relative mx-auto w-[360px] h-[760px] bg-background rounded-[40px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(45,90,69,0.35)] border-[10px] border-foreground/90";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("splash");
  const [tab, setTab] = useState<"today" | "progress" | "settings">("today");
  const [activeStory, setActiveStory] = useState<Story>(STORIES[0]);

  const goTab = (t: "today" | "progress" | "settings") => {
    setTab(t);
    if (t === "today") setScreen("today");
    if (t === "progress") setScreen("progress");
  };

  const screens: { id: Screen; label: string }[] = [
    { id: "splash", label: "Splash" },
    { id: "welcome", label: "Welcome" },
    { id: "setup1", label: "Setup 1" },
    { id: "setup2", label: "Setup 2" },
    { id: "today", label: "Today" },
    { id: "timer", label: "Timer" },
    { id: "celebrate", label: "Celebrate" },
    { id: "progress", label: "Progress" },
    { id: "stories", label: "Stories" },
    { id: "story", label: "Story" },
    { id: "missed", label: "Missed" },
  ];

  return (
    <div className="min-h-screen bg-[#EFEAE0] py-10 px-4">
      <header className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-display text-foreground tracking-tight">
          ReadSprout <span className="text-primary">·</span> Olee
        </h1>
        <p className="text-muted-foreground mt-2 font-semibold">
          A calm, parent-guided daily reading habit for kids 4–9
        </p>
      </header>

      {/* Screen picker */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-wrap justify-center gap-2">
        {screens.map((s) => (
          <button
            key={s.id}
            onClick={() => setScreen(s.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-bold transition",
              screen === s.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-foreground/70 hover:bg-primary-light"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid place-items-center">
        <div className={PHONE}>
          {/* status bar */}
          <div className="absolute top-0 inset-x-0 h-8 flex items-center justify-between px-6 text-[11px] font-bold text-foreground z-20">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-2 bg-foreground rounded-sm" />
              <span className="w-3 h-2 bg-foreground/60 rounded-sm" />
            </span>
          </div>

          <div className="absolute inset-0 pt-8 animate-fade-in" key={screen}>
            {screen === "splash" && <Splash onNext={() => setScreen("welcome")} />}
            {screen === "welcome" && <Welcome onNext={() => setScreen("setup1")} />}
            {screen === "setup1" && <Setup1 onNext={() => setScreen("setup2")} onBack={() => setScreen("welcome")} />}
            {screen === "setup2" && <Setup2 onNext={() => { setTab("today"); setScreen("today"); }} onBack={() => setScreen("setup1")} />}
            {screen === "today" && <Today onStart={() => setScreen("timer")} onStories={() => setScreen("stories")} tab={tab} setTab={goTab} />}
            {screen === "timer" && <Timer onDone={() => setScreen("celebrate")} onBack={() => setScreen("today")} />}
            {screen === "celebrate" && <Celebrate onProgress={() => { setTab("progress"); setScreen("progress"); }} onDone={() => { setTab("today"); setScreen("today"); }} />}
            {screen === "progress" && <Progress tab={tab} setTab={goTab} />}
            {screen === "stories" && <Stories onBack={() => setScreen("today")} onOpen={(s) => { setActiveStory(s); setScreen("story"); }} />}
            {screen === "story" && <StoryDetail story={activeStory} onBack={() => setScreen("stories")} onStart={() => setScreen("timer")} />}
            {screen === "missed" && <Missed onNext={() => setScreen("today")} />}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Reusable bits ---------- */

const PrimaryBtn = ({ children, onClick, className }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl shadow-[0_8px_20px_-8px_hsl(var(--primary)/0.6)] active:scale-[0.98] transition flex items-center justify-center gap-2",
      className
    )}
  >
    {children}
  </button>
);

const OutlineBtn = ({ children, onClick }: any) => (
  <button
    onClick={onClick}
    className="w-full border-2 border-primary/30 text-foreground font-bold py-3.5 rounded-2xl active:scale-[0.98] transition bg-card"
  >
    {children}
  </button>
);

/* ---------- Screens ---------- */

const Splash = ({ onNext }: { onNext: () => void }) => (
  <button
    onClick={onNext}
    className="w-full h-full flex flex-col items-center justify-center gap-6 px-8 bg-gradient-to-b from-primary-light via-background to-background"
  >
    <div className="animate-float">
      <Olee pose="wave" expression="excited" size={200} />
    </div>
    <div className="text-center">
      <h1 className="text-5xl font-display text-foreground tracking-tight">ReadSprout</h1>
      <p className="text-foreground/70 mt-3 font-semibold">Meet Olee, your reading buddy!</p>
    </div>
    <div className="absolute bottom-12 flex gap-1.5">
      <span className="w-2 h-2 rounded-full bg-primary" />
      <span className="w-2 h-2 rounded-full bg-primary/30" />
      <span className="w-2 h-2 rounded-full bg-primary/30" />
    </div>
  </button>
);

const Welcome = ({ onNext }: { onNext: () => void }) => (
  <div className="w-full h-full flex flex-col px-6 pt-2 pb-6">
    <div className="relative h-[260px] bg-primary-light rounded-3xl overflow-hidden flex items-end justify-center">
      <div className="absolute top-6 left-6 right-6 flex justify-center gap-2">
        {[
          { c: "#E8836B" }, { c: "#F4C542" }, { c: "#5BAF85" }, { c: "#7AB8D9" }, { c: "#C58AD9" },
        ].map((b, i) => (
          <div key={i} className="w-9 h-32 rounded-md shadow-sm" style={{ background: b.c, transform: `rotate(${(i - 2) * 4}deg)` }} />
        ))}
      </div>
      <div className="relative z-10 -mb-2">
        <Olee pose="peek" expression="happy" size={140} />
      </div>
    </div>

    <div className="mt-5 inline-flex self-start items-center gap-1.5 bg-accent-soft px-3 py-1.5 rounded-full">
      <ShieldCheck size={14} className="text-accent" />
      <span className="text-[11px] font-bold text-foreground">Trusted by 10,000+ parents</span>
    </div>

    <h2 className="text-[26px] leading-tight font-display mt-3 text-foreground">
      Olee helps your child <span className="text-primary">fall in love</span> with reading
    </h2>
    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
      15 minutes a day. Any book. No pressure. Just a gentle daily habit that grows a confident reader.
    </p>

    <div className="mt-auto space-y-3">
      <PrimaryBtn onClick={onNext}>Let's meet Olee <ArrowRight size={18} /></PrimaryBtn>
      <OutlineBtn>I already have an account</OutlineBtn>
    </div>
  </div>
);

const StepHeader = ({ step, onBack }: { step: number; onBack: () => void }) => (
  <div className="flex items-center justify-between pt-2">
    <button onClick={onBack} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
      <ArrowLeft size={18} />
    </button>
    <span className="text-xs font-bold bg-primary-light text-primary px-3 py-1.5 rounded-full">Step {step} of 2</span>
    <div className="w-10" />
  </div>
);

const Setup1 = ({ onNext, onBack }: any) => {
  const [time, setTime] = useState("Evening");
  return (
    <div className="w-full h-full px-6 flex flex-col">
      <StepHeader step={1} onBack={onBack} />
      <div className="mt-4 flex items-start gap-3">
        <Olee pose="wave" size={70} />
        <div className="bg-primary-light rounded-2xl rounded-tl-sm p-3 text-xs font-semibold text-foreground/80 leading-relaxed">
          Hi there! I'm Olee. Let's set things up so I can read with your little one!
        </div>
      </div>

      <h2 className="text-2xl font-display mt-6">About you</h2>

      <label className="text-xs font-bold text-foreground/70 mt-5 mb-2">PARENT NAME</label>
      <input
        defaultValue="Priya"
        className="bg-card border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none rounded-2xl px-4 py-3.5 font-semibold"
      />

      <label className="text-xs font-bold text-foreground/70 mt-5 mb-2">BEST TIME FOR DAILY READING</label>
      <div className="grid grid-cols-3 gap-2">
        {["Morning", "Evening", "After school"].map((t) => (
          <button
            key={t}
            onClick={() => setTime(t)}
            className={cn(
              "py-3 rounded-2xl text-sm font-bold border-2 transition",
              time === t
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-foreground/70"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-auto pb-2">
        <PrimaryBtn onClick={onNext}>Continue <ArrowRight size={18} /></PrimaryBtn>
      </div>
    </div>
  );
};

const Setup2 = ({ onNext, onBack }: any) => {
  const [age, setAge] = useState(6);
  const [name, setName] = useState("Aarav");
  return (
    <div className="w-full h-full px-6 flex flex-col">
      <StepHeader step={2} onBack={onBack} />
      <h2 className="text-2xl font-display mt-5">Tell us about your reader</h2>
      <p className="text-sm text-muted-foreground mt-1">Olee will use this to pick the perfect stories and pace.</p>

      <label className="text-xs font-bold text-foreground/70 mt-5 mb-2">CHILD'S NAME</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-card border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none rounded-2xl px-4 py-3.5 font-semibold"
      />

      <label className="text-xs font-bold text-foreground/70 mt-5 mb-2">AGE</label>
      <div className="flex gap-2 justify-between">
        {[4, 5, 6, 7, 8, 9].map((a) => (
          <button
            key={a}
            onClick={() => setAge(a)}
            className={cn(
              "w-11 h-11 rounded-full font-bold text-sm border-2 transition",
              age === a
                ? "bg-primary text-primary-foreground border-primary scale-110 shadow-md"
                : "bg-card border-border text-foreground/70"
            )}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="mt-6 bg-accent-soft border-2 border-dashed border-accent/40 rounded-2xl p-4 flex items-center gap-3">
        <Olee pose="celebrate" expression="excited" size={70} />
        <p className="text-sm font-bold text-foreground leading-snug">
          Yay! I can't wait to read with <span className="text-primary">{name || "your reader"}</span>!
        </p>
      </div>

      <div className="mt-auto pb-2">
        <PrimaryBtn onClick={onNext}>Let's start reading! <ArrowRight size={18} /></PrimaryBtn>
      </div>
    </div>
  );
};

const Today = ({ onStart, onStories, tab, setTab }: any) => (
  <div className="w-full h-full flex flex-col">
    <div className="px-6 pt-2 pb-2 flex items-start justify-between">
      <div>
        <p className="text-xs font-bold text-muted-foreground">Good evening, Priya</p>
        <h2 className="text-xl font-display">Aarav's reading time</h2>
      </div>
      <div className="flex items-center gap-1.5 bg-accent-soft px-3 py-1.5 rounded-full">
        <Flame size={16} className="text-accent" fill="currentColor" />
        <span className="text-sm font-extrabold text-accent">7 days</span>
      </div>
    </div>

    <div className="px-5 mt-2 flex-1 overflow-y-auto pb-24 scrollbar-hide">
      <div className="bg-card border-2 border-primary/30 rounded-3xl p-5 shadow-[0_10px_30px_-15px_rgba(91,175,133,0.4)]">
        <p className="text-[10px] font-extrabold tracking-wider text-primary">WHAT ARE WE READING TODAY?</p>
        <div className="mt-2 flex items-center gap-2">
          <input
            placeholder="Type book name..."
            className="flex-1 bg-primary-light border-2 border-dashed border-primary/40 rounded-xl px-3 py-2.5 text-sm font-semibold placeholder:text-primary/50 outline-none focus:bg-card"
          />
          <button className="w-10 h-10 rounded-xl bg-primary-light border-2 border-dashed border-primary/40 flex items-center justify-center text-primary">
            <Camera size={18} />
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-6xl font-display text-foreground tracking-tight">15:00</p>
          <p className="text-xs font-bold text-muted-foreground mt-1">minutes of reading with Olee</p>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={onStart}
            className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center pulse-ring shadow-lg active:scale-95 transition"
          >
            <Play size={32} fill="currentColor" className="ml-1" />
          </button>
        </div>
      </div>

      <button
        onClick={onStories}
        className="mt-4 w-full bg-card rounded-3xl p-4 flex items-center gap-3 border border-border active:scale-[0.99] transition"
      >
        <div className="w-12 h-12 rounded-2xl bg-accent-soft flex items-center justify-center">
          <BookOpen size={22} className="text-accent" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-extrabold text-foreground">Olee's Story Corner</p>
          <p className="text-xs text-muted-foreground">30 classic tales to explore</p>
        </div>
        <ChevronRight size={18} className="text-muted-foreground" />
      </button>
    </div>

    <BottomNav active={tab} onChange={setTab} />
  </div>
);

const Timer = ({ onDone, onBack }: any) => {
  // Progress at ~31% (10:24 / 15:00)
  const progress = 0.31;
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  // Position Olee on the ring
  const angle = -Math.PI / 2 + progress * 2 * Math.PI;
  const cx = 160 + radius * Math.cos(angle);
  const cy = 160 + radius * Math.sin(angle);

  return (
    <div className="w-full h-full flex flex-col items-center px-6 pt-2 bg-gradient-to-b from-primary-light/60 to-background">
      <div className="w-full flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <div className="text-center">
          <p className="text-[10px] font-extrabold tracking-wider text-primary">READING WITH OLEE</p>
          <p className="text-sm font-extrabold text-foreground">The Tiger Who Came to Tea</p>
        </div>
        <div className="w-10" />
      </div>

      <div className="relative mt-8" style={{ width: 320, height: 320 }}>
        <svg width="320" height="320" className="-rotate-90">
          <circle cx="160" cy="160" r={radius} stroke="hsl(var(--primary-light))" strokeWidth="18" fill="none" />
          <circle
            cx="160" cy="160" r={radius}
            stroke="hsl(var(--primary))" strokeWidth="18" fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className="transition-all duration-700"
          />
        </svg>
        {/* Olee on the ring */}
        <div
          className="absolute"
          style={{ left: cx - 38, top: cy - 50 }}
        >
          <Olee pose="reading" size={76} />
        </div>
        {/* time inside */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-6xl font-display text-foreground tracking-tight">10:24</p>
          <p className="text-xs font-bold text-muted-foreground mt-1">remaining</p>
        </div>
      </div>

      <button
        onClick={onDone}
        className="mt-6 w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg active:scale-95"
      >
        <Pause size={26} fill="currentColor" />
      </button>

      <p className="mt-4 text-sm italic text-muted-foreground">Olee is cheering Aarav on...</p>
    </div>
  );
};

const Celebrate = ({ onProgress, onDone }: any) => (
  <div className="w-full h-full flex flex-col items-center px-6 pt-4 pb-6 overflow-y-auto scrollbar-hide">
    <Olee pose="celebrate" expression="excited" size={150} />

    <div className="flex gap-2 mt-2">
      {[0, 1, 2].map((i) => (
        <Star
          key={i}
          size={36}
          className="text-accent animate-pop"
          fill="currentColor"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>

    <h2 className="text-3xl font-display mt-4 text-center">You did it, Aarav!</h2>
    <p className="text-sm text-muted-foreground text-center mt-2 leading-relaxed">
      15 minutes of amazing reading. Olee is so proud! That's <span className="font-extrabold text-foreground">8 days in a row!</span>
    </p>

    <div className="grid grid-cols-2 gap-3 mt-5 w-full">
      <div className="bg-primary-light rounded-2xl p-3 text-center">
        <Flame size={20} className="text-accent mx-auto" fill="currentColor" />
        <p className="text-2xl font-display mt-1">8</p>
        <p className="text-[10px] font-bold text-muted-foreground tracking-wider">DAY STREAK</p>
      </div>
      <div className="bg-accent-soft rounded-2xl p-3 text-center">
        <Star size={20} className="text-accent mx-auto" fill="currentColor" />
        <p className="text-2xl font-display mt-1">24</p>
        <p className="text-[10px] font-bold text-muted-foreground tracking-wider">TOTAL STARS</p>
      </div>
    </div>

    <div className="mt-4 w-full relative bg-accent-soft border-2 border-dashed border-accent/50 rounded-2xl p-4 pr-16">
      <div className="absolute -top-3 -right-2">
        <Olee pose="thinking" size={68} />
      </div>
      <p className="text-[10px] font-extrabold tracking-wider text-accent">OLEE WANTS TO KNOW</p>
      <p className="text-sm font-bold text-foreground mt-1 leading-snug">
        What was the coolest thing in your story today?
      </p>
    </div>

    <div className="w-full mt-auto space-y-2 pt-4">
      <PrimaryBtn onClick={onProgress}>See my progress</PrimaryBtn>
      <OutlineBtn onClick={onDone}>Done for today</OutlineBtn>
    </div>
  </div>
);

const Progress = ({ tab, setTab }: any) => {
  const days = [
    { d: "M", done: true }, { d: "T", done: true }, { d: "W", done: true },
    { d: "T", done: true }, { d: "F", done: false }, { d: "S", today: true, done: true }, { d: "S", done: false },
  ];
  const stats = [
    { v: "8", l: "Day streak", c: "text-accent" },
    { v: "24", l: "Stars earned", c: "text-accent" },
    { v: "85%", l: "Consistency", c: "text-primary" },
    { v: "1.2k", l: "Words read", c: "text-primary" },
  ];
  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-6 pt-2 pb-3">
        <h2 className="text-xl font-display">Aarav's progress</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-24 scrollbar-hide">
        <div className="bg-card border border-border rounded-3xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-soft flex items-center justify-center text-primary-foreground font-display text-lg">
            A
          </div>
          <div className="flex-1">
            <p className="font-extrabold">Aarav · 6</p>
            <p className="text-xs text-muted-foreground font-semibold">Budding reader</p>
          </div>
          <span className="text-[10px] font-bold bg-primary-light text-primary px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 size={12} /> Done today
          </span>
        </div>

        <div className="mt-3 bg-card border border-border rounded-3xl p-4">
          <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">THIS WEEK</p>
          <div className="mt-3 flex justify-between">
            {days.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-bold text-muted-foreground">{day.d}</span>
                <div className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold",
                  day.done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  day.today && "ring-2 ring-foreground ring-offset-2 ring-offset-card"
                )}>
                  {day.done ? <CheckCircle2 size={16} /> : "·"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-4">
              <p className={cn("text-2xl font-display", s.c)}>{s.v}</p>
              <p className="text-[11px] font-bold text-muted-foreground mt-1">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 bg-card border border-border rounded-3xl p-4">
          <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">RECENT BOOKS</p>
          <ul className="mt-2 divide-y divide-border">
            {[
              { n: "The Tiger Who Came to Tea", d: "Today" },
              { n: "Where the Wild Things Are", d: "Yesterday" },
              { n: "Charlotte's Web (ch. 3)", d: "2 days ago" },
            ].map((b, i) => (
              <li key={i} className="py-2.5 flex items-center gap-3">
                <div className="w-8 h-10 rounded-md bg-primary-light flex items-center justify-center">
                  <BookOpen size={14} className="text-primary" />
                </div>
                <p className="flex-1 text-sm font-bold">{b.n}</p>
                <p className="text-[11px] text-muted-foreground font-semibold">{b.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
};

const Stories = ({ onBack, onOpen }: { onBack: () => void; onOpen: (s: Story) => void }) => {
  const [filter, setFilter] = useState("All");
  const filtered = STORIES.filter((s) => {
    if (filter === "All") return true;
    if (filter === "Age 4-6") return s.age === "4-6" || s.age === "5-7";
    if (filter === "Age 7-9") return s.age === "7-9" || s.age === "5-7";
    return true;
  });
  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-5 pt-2 pb-3 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-lg font-display">Olee's story corner</h2>
      </div>

      <div className="px-5 flex gap-2">
        {["All", "Age 4-6", "Age 7-9"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold border-2",
              filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground/70"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 mt-4 pb-6 space-y-3 scrollbar-hide">
        {filtered.map((s, i) => (
          <button
            key={i}
            onClick={() => onOpen(s)}
            className="w-full text-left bg-card border border-border rounded-2xl p-3 flex items-center gap-3 active:scale-[0.99] transition"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: s.bg }}>
              <BookOpen size={26} style={{ color: s.icon }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-foreground truncate">{s.t}</p>
              <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                {s.time} min · {s.moral}
              </p>
            </div>
            <span className="text-[10px] font-extrabold bg-primary-light text-primary px-2 py-1 rounded-full">
              {s.age}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const StoryDetail = ({
  story,
  onBack,
  onStart,
}: {
  story: Story;
  onBack: () => void;
  onStart: () => void;
}) => (
  <div className="w-full h-full flex flex-col">
    <div className="px-5 pt-2 pb-3 flex items-center justify-between">
      <button onClick={onBack} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
        <ArrowLeft size={18} />
      </button>
      <span className="text-[10px] font-extrabold tracking-wider text-primary bg-primary-light px-3 py-1.5 rounded-full">
        AGE {story.age}
      </span>
      <div className="w-10" />
    </div>

    <div className="flex-1 overflow-y-auto px-5 pb-6 scrollbar-hide">
      <div
        className="relative h-44 rounded-3xl flex items-center justify-center overflow-hidden"
        style={{ background: story.bg }}
      >
        <BookOpen size={68} style={{ color: story.icon }} strokeWidth={1.6} />
        <div className="absolute -bottom-3 -right-2">
          <Olee pose="books" expression="happy" size={96} />
        </div>
      </div>

      <h2 className="text-2xl font-display mt-4 leading-tight">{story.t}</h2>
      <div className="mt-2 flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-extrabold bg-accent-soft text-accent px-2.5 py-1 rounded-full flex items-center gap-1">
          <Sparkles size={11} /> {story.moral}
        </span>
        <span className="text-[11px] font-bold text-muted-foreground">{story.time} min read</span>
      </div>

      <div className="mt-5 bg-card border border-border rounded-2xl p-4">
        <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">THE STORY</p>
        <p className="text-sm text-foreground/85 mt-2 leading-relaxed">{story.summary}</p>
      </div>

      <div className="mt-3 bg-card border border-border rounded-2xl p-4">
        <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">YOU'LL MEET</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {story.chars.map((c) => (
            <span key={c} className="text-xs font-bold bg-primary-light text-primary px-3 py-1.5 rounded-full">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 bg-accent-soft border-2 border-dashed border-accent/40 rounded-2xl p-4 flex items-start gap-3">
        <Olee pose="thinking" size={56} />
        <div>
          <p className="text-[10px] font-extrabold tracking-wider text-accent">OLEE'S LITTLE LESSON</p>
          <p className="text-sm font-bold text-foreground mt-1 leading-snug">{story.lesson}</p>
        </div>
      </div>
    </div>

    <div className="px-5 pb-5">
      <PrimaryBtn onClick={onStart}>
        <Play size={18} fill="currentColor" /> Start {story.time}-minute read
      </PrimaryBtn>
    </div>
  </div>
);


const Missed = ({ onNext }: { onNext: () => void }) => (
  <div className="w-full h-full flex flex-col items-center px-8 pt-12 pb-6 bg-gradient-to-b from-primary-light/40 to-background">
    <Olee pose="calm" expression="calm" size={170} />
    <h2 className="text-2xl font-display mt-6 text-center">It's okay, everyone takes a break!</h2>
    <p className="text-sm text-muted-foreground text-center mt-3 leading-relaxed">
      Olee missed you yesterday, but is ready to read again today. No pressure — just pick up where you left off.
    </p>
    <Sparkles className="text-accent mt-6" size={20} />
    <div className="mt-auto w-full">
      <PrimaryBtn onClick={onNext}>Let's read today <ArrowRight size={18} /></PrimaryBtn>
    </div>
  </div>
);

export default Index;
