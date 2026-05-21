import { useRef, useState } from "react";
import { Olee } from "@/components/Olee";
import { BottomNav } from "@/components/BottomNav";
import {
  ArrowRight, ArrowLeft, Camera, Play, Pause, Flame, Star, BookOpen,
  CheckCircle2, ChevronRight, ShieldCheck, Sparkles, Mail, Bell,
  User, Crown, LogOut, HelpCircle, ChevronLeft, Check, Calendar,
  Heart, Pencil, Clock, AlertCircle, Plus, Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Screen =
  | "splash" | "welcome" | "setup1" | "setup2" | "setupDone" | "today"
  | "timer" | "celebrate" | "storyNote" | "progress" | "progressDetails"
  | "stories" | "story" | "storyRead" | "missed"
  | "login" | "settings" | "editChild" | "subscription"
  | "notifDaily" | "notifMissed" | "notifWeekly" | "formErrors";

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
    if (t === "settings") setScreen("settings");
  };

  const screens: { id: Screen; label: string }[] = [
    { id: "splash", label: "1. Splash" },
    { id: "welcome", label: "2. Welcome" },
    { id: "setup1", label: "3. Parent" },
    { id: "setup2", label: "4. Child" },
    { id: "setupDone", label: "5. All set" },
    { id: "today", label: "6. Today" },
    { id: "timer", label: "7. Timer" },
    { id: "celebrate", label: "8. Celebrate" },
    { id: "storyNote", label: "8b. Story note" },
    { id: "missed", label: "9. Missed" },
    { id: "progress", label: "10. Dashboard" },
    { id: "progressDetails", label: "11. Details" },
    { id: "stories", label: "12. Stories" },
    { id: "storyRead", label: "13. Read" },
    { id: "story", label: "Story info" },
    { id: "settings", label: "14. Settings" },
    { id: "editChild", label: "15. Edit child" },
    { id: "subscription", label: "16. Premium" },
    { id: "login", label: "17. Login" },
    { id: "notifDaily", label: "18. Notif daily" },
    { id: "notifMissed", label: "19. Notif missed" },
    { id: "notifWeekly", label: "20. Notif weekly" },
    { id: "formErrors", label: "21. Form errors" },
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
            {screen === "welcome" && <Welcome onNext={() => setScreen("setup1")} onLogin={() => setScreen("login")} />}
            {screen === "login" && <Login onBack={() => setScreen("welcome")} onNext={() => { setTab("today"); setScreen("today"); }} />}
            {screen === "setup1" && <Setup1 onNext={() => setScreen("setup2")} onBack={() => setScreen("welcome")} />}
            {screen === "setup2" && <Setup2 onNext={() => setScreen("setupDone")} onBack={() => setScreen("setup1")} />}
            {screen === "setupDone" && <SetupDone onNext={() => { setTab("today"); setScreen("today"); }} />}
            {screen === "today" && <Today onStart={() => setScreen("timer")} onStories={() => setScreen("stories")} tab={tab} setTab={goTab} />}
            {screen === "timer" && <Timer onDone={() => setScreen("celebrate")} onBack={() => setScreen("today")} />}
            {screen === "celebrate" && <Celebrate onProgress={() => { setTab("progress"); setScreen("progress"); }} onDone={() => { setTab("today"); setScreen("today"); }} onNote={() => setScreen("storyNote")} />}
            {screen === "storyNote" && <StoryNote onBack={() => setScreen("celebrate")} onSave={() => setScreen("celebrate")} />}
            {screen === "progress" && <Progress tab={tab} setTab={goTab} onDetails={() => setScreen("progressDetails")} />}
            {screen === "progressDetails" && <ProgressDetails onBack={() => setScreen("progress")} />}
            {screen === "stories" && <Stories onBack={() => setScreen("today")} onOpen={(s) => { setActiveStory(s); setScreen("story"); }} />}
            {screen === "story" && <StoryDetail story={activeStory} onBack={() => setScreen("stories")} onStart={() => setScreen("storyRead")} />}
            {screen === "storyRead" && <StoryRead story={activeStory} onBack={() => setScreen("story")} onComplete={() => setScreen("celebrate")} />}
            {screen === "missed" && <Missed onNext={() => setScreen("today")} />}
            {screen === "settings" && <SettingsScreen tab={tab} setTab={goTab} onEdit={() => setScreen("editChild")} onSubscribe={() => setScreen("subscription")} onLogout={() => setScreen("welcome")} />}
            {screen === "editChild" && <EditChild onBack={() => setScreen("settings")} />}
            {screen === "subscription" && <SubscriptionScreen onBack={() => setScreen("settings")} />}
            {screen === "notifDaily" && <NotifPreview kind="daily" onOpen={() => setScreen("today")} />}
            {screen === "notifMissed" && <NotifPreview kind="missed" onOpen={() => setScreen("missed")} />}
            {screen === "notifWeekly" && <NotifPreview kind="weekly" onOpen={() => { setTab("progress"); setScreen("progress"); }} />}
            {screen === "formErrors" && <FormErrorStyles />}
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

const Splash = ({ onNext }: { onNext: () => void }) => {
  const slides = [
    {
      pose: "wave" as const,
      expression: "excited" as const,
      title: "Meet Olee!",
      sub: "Your child's reading buddy who grows with every story",
      bg: "from-primary-light via-background to-background",
    },
    {
      pose: "reading" as const,
      expression: "happy" as const,
      title: "Just 15 minutes a day",
      sub: "Any book. A calm timer. Stars and streaks. That's it.",
      bg: "from-accent-soft via-background to-background",
    },
    {
      pose: "celebrate" as const,
      expression: "proud" as const,
      title: "Watch them fall in love with reading",
      sub: "Join 10,000+ parents building readers, not screen time",
      bg: "from-primary-light via-accent-soft to-background",
    },
  ];
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);

  const go = (dir: number) => {
    setI((p) => Math.max(0, Math.min(slides.length - 1, p + dir)));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startX.current = null;
  };

  const s = slides[i];
  const isLast = i === slides.length - 1;

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={`w-full h-full flex flex-col items-center justify-center gap-6 px-8 bg-gradient-to-b ${s.bg} relative`}
    >
      <button
        onClick={() => setI(slides.length - 1)}
        className={`absolute top-6 right-6 text-xs font-bold text-muted-foreground ${isLast ? "invisible" : ""}`}
      >
        Skip
      </button>

      <div className="animate-float" key={i}>
        <Olee pose={s.pose} expression={s.expression} size={180} />
      </div>
      <div className="text-center max-w-[280px]">
        <h1 className="text-[28px] leading-tight font-display text-foreground tracking-tight">{s.title}</h1>
        <p className="text-foreground/70 mt-3 font-semibold text-sm leading-relaxed">{s.sub}</p>
      </div>

      <div className="absolute bottom-28 flex gap-1.5">
        {slides.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-primary" : "w-2 bg-primary/30"}`}
          />
        ))}
      </div>

      <div className="absolute bottom-10 left-8 right-8">
        {isLast ? (
          <PrimaryBtn onClick={onNext}>
            Get Started <ArrowRight size={18} />
          </PrimaryBtn>
        ) : (
          <button
            onClick={() => go(1)}
            className="w-full text-center text-sm font-bold text-primary py-3"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

const Welcome = ({ onNext, onLogin }: { onNext: () => void; onLogin: () => void }) => (
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
      <OutlineBtn onClick={onLogin}>I already have an account</OutlineBtn>
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
    <div className="px-6 pt-2 pb-2 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="animate-float">
          <Olee pose="wave" expression="excited" size={56} />
        </div>
        <div>
          <p className="text-xs font-bold text-primary">Hi Aarav!</p>
          <h2 className="text-xl font-display leading-tight">Let's read today!</h2>
        </div>
      </div>
      <div className="flex items-center gap-1.5 bg-accent-soft px-3 py-1.5 rounded-full">
        <Flame size={16} className="text-accent" fill="currentColor" />
        <span className="text-sm font-extrabold text-accent">7 days</span>
      </div>
    </div>

    <div className="px-5 mt-2 flex-1 overflow-y-auto pb-24 scrollbar-hide">
      <div className="bg-card border-2 border-primary/30 rounded-3xl p-5 shadow-[0_10px_30px_-15px_rgba(91,175,133,0.4)]">
        <p className="text-[11px] font-extrabold tracking-wider text-primary">WHAT ARE WE READING TODAY?</p>
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
          <p className="text-xs font-bold text-muted-foreground mt-1">Olee is ready to read with you!</p>
        </div>

        <div className="mt-5 flex flex-col items-center gap-2">
          <button
            onClick={onStart}
            className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center pulse-ring shadow-lg active:scale-95 transition"
          >
            <Play size={36} fill="currentColor" className="ml-1" />
          </button>
          <p className="text-sm font-extrabold text-primary">Start reading!</p>
        </div>
      </div>

      <button
        onClick={onStories}
        className="mt-4 w-full bg-card rounded-3xl p-4 flex items-center gap-3 border-2 border-accent/30 active:scale-[0.99] transition"
      >
        <div className="w-12 h-12 rounded-2xl bg-accent-soft flex items-center justify-center">
          <BookOpen size={22} className="text-accent" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-extrabold text-foreground">Olee's Story Corner</p>
          <p className="text-xs text-muted-foreground">Pick a tale with Olee →</p>
        </div>
        <ChevronRight size={18} className="text-accent" />
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

const Progress = ({ tab, setTab, onDetails }: any) => {
  const days = [
    { d: "M", done: true }, { d: "T", done: true }, { d: "W", done: true },
    { d: "T", done: true }, { d: "F", done: false }, { d: "S", today: true, done: true }, { d: "S", done: false },
  ];
  const stats = [
    { v: "8", l: "Day streak" },
    { v: "24", l: "Stars earned" },
    { v: "85%", l: "Consistency" },
    { v: "1.2k", l: "Words read" },
  ];
  return (
    <div className="w-full h-full flex flex-col bg-muted/30">
      <div className="px-6 pt-2 pb-3">
        <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">PROGRESS</p>
        <h2 className="text-xl font-display text-foreground">Aarav's progress</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-24 scrollbar-hide">
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-display text-base">
            A
          </div>
          <div className="flex-1">
            <p className="font-bold text-foreground">Aarav · Age 6</p>
            <p className="text-xs text-muted-foreground font-semibold">Budding reader</p>
          </div>
          <span className="text-[10px] font-bold bg-muted text-foreground/70 px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 size={12} className="text-primary" /> Read today
          </span>
        </div>

        <div className="mt-3 bg-card border border-border rounded-2xl p-4">
          <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">THIS WEEK</p>
          <div className="mt-3 flex justify-between">
            {days.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-bold text-muted-foreground">{day.d}</span>
                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold",
                  day.done ? "bg-primary/90 text-primary-foreground" : "bg-muted text-muted-foreground",
                  day.today && "ring-2 ring-foreground/40 ring-offset-2 ring-offset-card"
                )}>
                  {day.done ? <CheckCircle2 size={16} /> : "·"}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground font-semibold mt-3">5 of 7 days completed</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-4">
              <p className="text-2xl font-display text-foreground">{s.v}</p>
              <p className="text-[11px] font-bold text-muted-foreground mt-1 tracking-wide">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 bg-card border border-border rounded-2xl p-4">
          <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">READING LOG</p>
          <ul className="mt-2 divide-y divide-border">
            {[
              { n: "The Tiger Who Came to Tea", d: "Today" },
              { n: "Where the Wild Things Are", d: "Yesterday" },
              { n: "Charlotte's Web (ch. 3)", d: "2 days ago" },
            ].map((b, i) => (
              <li key={i} className="py-2.5 flex items-center gap-3">
                <div className="w-8 h-10 rounded-md bg-muted flex items-center justify-center">
                  <BookOpen size={14} className="text-foreground/60" />
                </div>
                <p className="flex-1 text-sm font-semibold text-foreground">{b.n}</p>
                <p className="text-[11px] text-muted-foreground font-semibold">{b.d}</p>
              </li>
            ))}
          </ul>
          <button onClick={onDetails} className="mt-3 w-full flex items-center justify-center gap-1 text-xs font-bold text-foreground/70 py-2 border-t border-border pt-3">
            View full history <ChevronRight size={14} />
          </button>
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

/* ---------- Login (17) ---------- */
const Login = ({ onBack, onNext }: { onBack: () => void; onNext: () => void }) => {
  const [method, setMethod] = useState<"email" | "phone">("email");
  return (
    <div className="w-full h-full flex flex-col px-6 pt-2 pb-6">
      <button onClick={onBack} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
        <ArrowLeft size={18} />
      </button>
      <div className="mt-4 flex flex-col items-center">
        <Olee pose="wave" expression="happy" size={120} />
        <h2 className="text-2xl font-display mt-3">Welcome back!</h2>
        <p className="text-sm text-muted-foreground mt-1">Olee missed you.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 bg-muted p-1 rounded-2xl">
        {(["email", "phone"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            className={cn(
              "py-2.5 rounded-xl text-sm font-bold capitalize",
              method === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <label className="text-xs font-bold text-foreground/70 mt-5 mb-2">
        {method === "email" ? "EMAIL" : "PHONE"}
      </label>
      <input
        defaultValue={method === "email" ? "priya@example.com" : "+91 98765 43210"}
        className="bg-card border-2 border-border focus:border-primary outline-none rounded-2xl px-4 py-3.5 font-semibold"
      />
      <p className="text-[11px] text-muted-foreground font-semibold mt-2">We'll send a one-time code. No password needed.</p>

      <div className="mt-5 space-y-3">
        <PrimaryBtn onClick={onNext}>Send code <ArrowRight size={18} /></PrimaryBtn>
        <button className="w-full bg-card border-2 border-border font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2">
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#EA4335] via-[#FBBC05] to-[#4285F4]" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

/* ---------- Setup done (5) ---------- */
const SetupDone = ({ onNext }: { onNext: () => void }) => (
  <div className="w-full h-full flex flex-col items-center px-6 pt-6 pb-6 bg-gradient-to-b from-primary-light/60 to-background">
    <div className="animate-float">
      <Olee pose="celebrate" expression="excited" size={170} />
    </div>
    <div className="flex gap-1.5 mt-2">
      {[0, 1, 2].map((i) => (
        <Sparkles key={i} size={20} className="text-accent animate-pop" style={{ animationDelay: `${i * 120}ms` }} />
      ))}
    </div>
    <h2 className="text-3xl font-display mt-4 text-center">You're all set!</h2>
    <p className="text-sm text-muted-foreground text-center mt-2 leading-relaxed">
      Olee can't wait to start reading with Aarav. Here's what tomorrow looks like:
    </p>

    <div className="mt-5 w-full bg-card border-2 border-primary/30 rounded-3xl p-4 space-y-3">
      {[
        { i: BookOpen, t: "Pick any book", s: "From your shelf or Olee's corner" },
        { i: Clock, t: "Tap play, read 15 min", s: "Olee walks the timer ring" },
        { i: Star, t: "Earn stars & a streak", s: "Celebrate together" },
      ].map(({ i: Icon, t, s }, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
            <Icon size={18} />
          </div>
          <div>
            <p className="text-sm font-extrabold">{t}</p>
            <p className="text-[11px] text-muted-foreground font-semibold">{s}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-auto w-full">
      <PrimaryBtn onClick={onNext}>Go to Today <ArrowRight size={18} /></PrimaryBtn>
    </div>
  </div>
);

/* ---------- Progress details (11) ---------- */
const ProgressDetails = ({ onBack }: { onBack: () => void }) => {
  const cells = Array.from({ length: 30 }, (_, i) => {
    const r = (i * 7) % 11;
    return r < 7 ? "done" : r < 9 ? "miss" : "future";
  });
  return (
    <div className="w-full h-full flex flex-col bg-muted/30">
      <div className="px-5 pt-2 pb-3 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-lg font-display">Reading history</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-6 scrollbar-hide">
        <div className="bg-card border border-border rounded-3xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">MAY 2026</p>
            <div className="flex gap-3 text-[10px] font-bold">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> Read</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-muted" /> Missed</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1.5">
            {cells.map((c, i) => (
              <div key={i} className={cn(
                "aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold",
                c === "done" && "bg-primary text-primary-foreground",
                c === "miss" && "bg-muted text-muted-foreground",
                c === "future" && "bg-card border border-dashed border-border text-muted-foreground/50"
              )}>{i + 1}</div>
            ))}
          </div>
        </div>

        <div className="mt-3 bg-card border border-border rounded-3xl p-4">
          <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">BOOK LOG</p>
          <ul className="mt-2 divide-y divide-border">
            {[
              { n: "The Tiger Who Came to Tea", d: "May 6", m: "15 min" },
              { n: "Where the Wild Things Are", d: "May 5", m: "15 min" },
              { n: "Charlotte's Web (ch. 3)", d: "May 4", m: "18 min" },
              { n: "The Gruffalo", d: "May 3", m: "12 min" },
              { n: "Matilda (ch. 1)", d: "May 2", m: "15 min" },
            ].map((b, i) => (
              <li key={i} className="py-2.5 flex items-center gap-3">
                <BookOpen size={16} className="text-primary" />
                <p className="flex-1 text-sm font-bold truncate">{b.n}</p>
                <p className="text-[11px] text-muted-foreground font-semibold">{b.d} · {b.m}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 bg-card border border-border rounded-2xl p-4">
          <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">REFLECTION NOTES</p>
          <div className="mt-3 space-y-2.5">
            {[
              { d: "May 6", t: "I liked when the tiger drank ALL the tea!" },
              { d: "May 4", t: "Wilbur is the best pig ever." },
              { d: "May 2", t: "Matilda is so smart." },
            ].map((j, i) => (
              <div key={i} className="bg-muted/50 rounded-lg p-3">
                <p className="text-[10px] font-bold text-muted-foreground">{j.d}</p>
                <p className="text-sm font-bold text-foreground mt-0.5">"{j.t}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Story reading (13) ---------- */
const StoryRead = ({ story, onBack, onComplete }: { story: Story; onBack: () => void; onComplete: () => void }) => (
  <div className="w-full h-full flex flex-col">
    <div className="px-5 pt-2 pb-2 flex items-center justify-between border-b border-border">
      <button onClick={onBack} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
        <ArrowLeft size={18} />
      </button>
      <p className="text-xs font-extrabold truncate max-w-[180px]">{story.t}</p>
      <span className="text-[10px] font-bold text-muted-foreground">62%</span>
    </div>
    <div className="h-1 bg-muted">
      <div className="h-full bg-primary" style={{ width: "62%" }} />
    </div>

    <div className="flex-1 overflow-y-auto px-6 pt-5 pb-6 scrollbar-hide">
      <h1 className="text-3xl font-display leading-tight">{story.t}</h1>
      <p className="text-xs font-bold text-muted-foreground mt-1">A tale of {story.moral.toLowerCase()} · {story.time} min</p>

      <div className="mt-5 space-y-4 text-[15px] leading-[1.7] text-foreground/85 font-medium">
        <p className="first-letter:text-5xl first-letter:font-display first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:text-primary">
          {story.summary}
        </p>
        <p>
          And so our little friend learned something important that day. The world can feel very big when you are very small, but a brave heart and a kind word can carry you a long way.
        </p>
        <p>
          The sun began to set, painting the sky in soft oranges and pinks. {story.chars[0]} smiled, knowing that tomorrow would bring another adventure.
        </p>
        <div className="my-5 flex items-center justify-center gap-2 text-muted-foreground">
          <span className="h-px bg-border flex-1" />
          <Heart size={14} />
          <span className="h-px bg-border flex-1" />
        </div>
        <p className="font-display text-lg text-center text-primary">{story.lesson}</p>
      </div>
    </div>

    <div className="px-5 pb-5 pt-3 border-t border-border bg-card">
      <PrimaryBtn onClick={onComplete}>
        <Star size={18} fill="currentColor" /> I finished reading!
      </PrimaryBtn>
    </div>
  </div>
);

/* ---------- Settings (14) ---------- */
const SettingsScreen = ({ tab, setTab, onEdit, onSubscribe, onLogout }: any) => {
  const Row = ({ icon: Icon, label, value, onClick, danger }: any) => (
    <button onClick={onClick} className="w-full flex items-center gap-3 py-3.5 active:bg-muted/40 rounded-xl px-2 -mx-2">
      <div className={cn(
        "w-9 h-9 rounded-xl flex items-center justify-center",
        danger ? "bg-destructive/10 text-destructive" : "bg-primary-light text-primary"
      )}>
        <Icon size={17} />
      </div>
      <span className={cn("flex-1 text-left text-sm font-bold", danger && "text-destructive")}>{label}</span>
      {value && <span className="text-xs text-muted-foreground font-semibold">{value}</span>}
      {!danger && <ChevronRight size={16} className="text-muted-foreground" />}
    </button>
  );
  return (
    <div className="w-full h-full flex flex-col bg-muted/30">
      <div className="px-6 pt-2 pb-3">
        <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">ACCOUNT</p>
        <h2 className="text-xl font-display text-foreground">Settings</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-24 scrollbar-hide space-y-4">
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-primary-light flex items-center justify-center text-primary font-display text-lg">
            P
          </div>
          <div className="flex-1">
            <p className="font-bold text-foreground">Priya</p>
            <p className="text-xs text-muted-foreground font-semibold">Free plan</p>
          </div>
          <button onClick={onSubscribe} className="text-[10px] font-bold bg-foreground text-background px-2.5 py-1.5 rounded-full flex items-center gap-1">
            <Crown size={11} /> Upgrade
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl px-4 py-1">
          <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground pt-3">READING</p>
          <Row icon={Clock} label="Reminder time" value="6:30 PM" onClick={() => {}} />
          <Row icon={User} label="Aarav's profile" value="Age 6" onClick={onEdit} />
          <Row icon={Bell} label="Notifications" value="On" onClick={() => {}} />
        </div>

        <div className="bg-card border border-border rounded-2xl px-4 py-1">
          <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground pt-3">ACCOUNT</p>
          <Row icon={Crown} label="Manage subscription" value="Free" onClick={onSubscribe} />
          <Row icon={HelpCircle} label="Help & about" onClick={() => {}} />
          <Row icon={LogOut} label="Log out" onClick={onLogout} danger />
        </div>

        <p className="text-center text-[11px] text-muted-foreground font-semibold">ReadSprout v1.0</p>
      </div>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
};

/* ---------- Edit child profile (15) ---------- */
const EditChild = ({ onBack }: { onBack: () => void }) => {
  const [age, setAge] = useState(6);
  const [name, setName] = useState("Aarav");
  const [level, setLevel] = useState("Budding");
  return (
    <div className="w-full h-full flex flex-col px-6 pt-2 pb-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-base font-display">Edit profile</h2>
        <div className="w-10" />
      </div>

      <div className="mt-4 flex justify-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center font-display text-3xl text-primary">A</div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
            <Pencil size={14} />
          </button>
        </div>
      </div>

      <label className="text-xs font-bold text-foreground/70 mt-5 mb-2">CHILD'S NAME</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-card border-2 border-border focus:border-primary outline-none rounded-2xl px-4 py-3.5 font-semibold"
      />

      <label className="text-xs font-bold text-foreground/70 mt-5 mb-2">AGE</label>
      <div className="flex gap-2 justify-between">
        {[4, 5, 6, 7, 8, 9].map((a) => (
          <button
            key={a}
            onClick={() => setAge(a)}
            className={cn(
              "w-11 h-11 rounded-full font-bold text-sm border-2 transition",
              age === a ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground/70"
            )}
          >
            {a}
          </button>
        ))}
      </div>

      <label className="text-xs font-bold text-foreground/70 mt-5 mb-2">READING LEVEL</label>
      <div className="grid grid-cols-3 gap-2">
        {["Sprout", "Budding", "Blooming"].map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={cn(
              "py-3 rounded-2xl text-xs font-bold border-2",
              level === l ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground/70"
            )}
          >
            {l}
          </button>
        ))}
      </div>

      <button className="mt-5 w-full text-sm font-bold text-foreground/70 bg-muted py-3 rounded-2xl flex items-center justify-center gap-2 border border-border">
        <Crown size={14} /> Add another child · Premium
      </button>

      <div className="mt-auto pb-2">
        <PrimaryBtn onClick={onBack}><Check size={18} /> Save changes</PrimaryBtn>
      </div>
    </div>
  );
};

/* ---------- Subscription (16) ---------- */
const SubscriptionScreen = ({ onBack }: { onBack: () => void }) => {
  const features = [
    { t: "Full Story Corner (150+ tales)", free: false },
    { t: "Unlimited reading history", free: false },
    { t: "Multiple child profiles", free: false },
    { t: "Weekly progress reports", free: false },
    { t: "Keepsake PDF export", free: false },
    { t: "Daily 15-min timer", free: true },
    { t: "30 starter stories", free: true },
  ];
  return (
    <div className="w-full h-full flex flex-col bg-muted/30">
      <div className="px-5 pt-2 pb-2 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <span className="text-[10px] font-extrabold tracking-wider text-foreground/70 bg-card border border-border px-3 py-1.5 rounded-full flex items-center gap-1">
          <Crown size={11} /> PREMIUM
        </span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-4 scrollbar-hide">
        <div className="mt-4">
          <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">SUBSCRIPTION</p>
          <h2 className="text-2xl font-display mt-1 leading-tight text-foreground">
            ReadSprout Premium
          </h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Expand the Story Corner, unlock multiple child profiles, and access detailed weekly reports.
          </p>
        </div>

        <div className="mt-5 bg-card border border-border rounded-2xl p-5 relative">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-extrabold text-muted-foreground tracking-wider">MONTHLY PLAN</p>
            <span className="text-[10px] font-bold bg-muted text-foreground/70 px-2 py-0.5 rounded-full">Best value</span>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-display text-foreground">₹199</span>
            <span className="text-sm text-muted-foreground font-semibold">/ month</span>
          </div>
          <p className="text-[11px] text-muted-foreground font-semibold mt-1">Cancel anytime. Secure payments via Razorpay.</p>

          <ul className="mt-4 space-y-2 border-t border-border pt-4">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center",
                  f.free ? "bg-muted text-muted-foreground" : "bg-primary/90 text-primary-foreground"
                )}>
                  <Check size={12} />
                </span>
                <span className={cn("font-semibold", f.free ? "text-muted-foreground" : "text-foreground")}>{f.t}</span>
                {f.free && <span className="ml-auto text-[10px] text-muted-foreground">in free</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-5 pb-5">
        <PrimaryBtn onClick={onBack}>Start Premium</PrimaryBtn>
        <p className="text-center text-[11px] text-muted-foreground font-semibold mt-2">Manage or cancel anytime in Settings.</p>
      </div>
    </div>
  );
};

/* ---------- Notification preview (18, 19, 20) ---------- */
const Notification_ = ({ kind, onOpen }: { kind: "daily" | "missed" | "weekly"; onOpen: () => void }) => {
  const data = {
    daily: { title: "ReadSprout", body: "Olee is waiting to read with Aarav! Just 15 minutes today. 📚", time: "6:30 PM", icon: Bell },
    missed: { title: "ReadSprout", body: "Olee missed you yesterday, but today is a fresh start! 💚", time: "9:00 AM", icon: Heart },
    weekly: { title: "ReadSprout · Weekly", body: "Aarav read 5 of 7 days this week! Olee is growing strong. 🌱", time: "Sun 7:00 PM", icon: Calendar },
  }[kind];
  const Icon = data.icon;
  return (
    <div className="w-full h-full bg-gradient-to-b from-foreground/85 to-foreground/95 flex flex-col px-4 pt-4 relative overflow-hidden">
      <div className="text-center text-background/90">
        <p className="text-6xl font-display tracking-tight">9:41</p>
        <p className="text-sm font-bold mt-1">Wednesday, May 6</p>
      </div>

      <div className="mt-8 bg-card/95 backdrop-blur rounded-3xl p-3.5 shadow-2xl animate-fade-in">
        <div className="flex items-start gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <Icon size={18} className="text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-extrabold tracking-wide text-foreground">{data.title}</p>
              <p className="text-[10px] text-muted-foreground font-semibold">{data.time}</p>
            </div>
            <p className="text-sm font-bold text-foreground mt-0.5 leading-snug">{data.body}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 bg-card/20 backdrop-blur rounded-2xl p-3 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
          <Mail size={14} className="text-accent-foreground" />
        </div>
        <p className="text-xs font-bold text-background/80 flex-1">Mail · Newsletter</p>
        <p className="text-[10px] text-background/60">8:14 AM</p>
      </div>

      <div className="mt-auto pb-8 flex flex-col items-center gap-3">
        <button
          onClick={onOpen}
          className="w-full bg-card/95 backdrop-blur text-foreground font-extrabold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          Tap to open ReadSprout <ArrowRight size={16} />
        </button>
        <div className="w-32 h-1 rounded-full bg-background/40" />
      </div>
    </div>
  );
};
const NotifPreview = Notification_;

/* ---------- Form Error Reference ---------- */
const FormErrorStyles = () => {
  const errorInputBase =
    "bg-card border-2 rounded-2xl px-4 py-3.5 font-semibold outline-none transition";
  const errorBorder = "border-destructive focus:border-destructive focus:ring-4 focus:ring-destructive/15";
  const normalBorder = "border-border focus:border-primary focus:ring-4 focus:ring-primary/15";

  return (
    <div className="w-full h-full flex flex-col px-6 pt-2 pb-6 overflow-y-auto scrollbar-hide">
      <h2 className="text-2xl font-display mt-4">Form Errors</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Reusable field error patterns for signup, login &amp; more.
      </p>

      {/* 1. Text field with inline error */}
      <div className="mt-6">
        <label className="text-xs font-bold text-destructive">CHILD'S NAME</label>
        <input
          defaultValue=""
          placeholder="Enter name"
          className={cn(errorInputBase, errorBorder, "w-full mt-2")}
        />
        <div className="flex items-center gap-1.5 mt-1.5">
          <AlertCircle size={14} className="text-destructive shrink-0" />
          <p className="text-sm font-medium text-destructive">Name is required</p>
        </div>
      </div>

      {/* 2. Email field with inline error */}
      <div className="mt-6">
        <label className="text-xs font-bold text-destructive">EMAIL</label>
        <input
          type="email"
          defaultValue="priya@example"
          className={cn(errorInputBase, errorBorder, "w-full mt-2")}
        />
        <div className="flex items-center gap-1.5 mt-1.5">
          <AlertCircle size={14} className="text-destructive shrink-0" />
          <p className="text-sm font-medium text-destructive">Please enter a valid email address</p>
        </div>
      </div>

      {/* 3. Valid field (for contrast) */}
      <div className="mt-6">
        <label className="text-xs font-bold text-foreground/70">PHONE</label>
        <input
          type="tel"
          defaultValue="+91 98765 43210"
          className={cn(errorInputBase, normalBorder, "w-full mt-2")}
        />
        <p className="text-[11px] text-muted-foreground font-semibold mt-2">
          Looks good — we'll send a one-time code.
        </p>
      </div>

      {/* 4. Common form-level error banner */}
      <div className="mt-6 bg-destructive/5 border-2 border-destructive/30 rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle size={18} className="text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-destructive">Something went wrong</p>
          <p className="text-sm text-destructive/80 mt-0.5">
            We couldn't create your account. Please check your details and try again.
          </p>
        </div>
      </div>

      {/* 5. Multiple field group error */}
      <div className="mt-6 bg-destructive/5 border-2 border-dashed border-destructive/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={16} className="text-destructive" />
          <p className="text-sm font-bold text-destructive">Please fix 2 fields below</p>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-destructive">PASSWORD</label>
            <input
              type="password"
              defaultValue="123"
              className={cn(errorInputBase, errorBorder, "w-full mt-1.5")}
            />
            <p className="text-sm font-medium text-destructive mt-1">Must be at least 8 characters</p>
          </div>
          <div>
            <label className="text-xs font-bold text-destructive">CONFIRM PASSWORD</label>
            <input
              type="password"
              defaultValue="1234"
              className={cn(errorInputBase, errorBorder, "w-full mt-1.5")}
            />
            <p className="text-sm font-medium text-destructive mt-1">Passwords do not match</p>
          </div>
        </div>
      </div>

      {/* 6. Inline field + icon combo */}
      <div className="mt-6">
        <label className="text-xs font-bold text-foreground/70">INVITE CODE (OPTIONAL)</label>
        <div className="relative mt-2">
          <input
            defaultValue="WRONG1"
            className={cn(errorInputBase, errorBorder, "w-full pr-10")}
          />
          <AlertCircle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive" />
        </div>
        <p className="text-sm font-medium text-destructive mt-1.5">This invite code is invalid or expired</p>
      </div>

      <div className="mt-8 p-4 bg-primary-light rounded-2xl">
        <p className="text-xs font-extrabold tracking-wider text-primary uppercase mb-2">How to use</p>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Copy the <code className="bg-card px-1.5 py-0.5 rounded text-xs font-bold">errorInputBase</code> + <code className="bg-card px-1.5 py-0.5 rounded text-xs font-bold">errorBorder</code> classes for any errored field. Use <code className="bg-card px-1.5 py-0.5 rounded text-xs font-bold">text-destructive</code> for labels and messages. Use the banner pattern for form-level errors.
        </p>
      </div>
    </div>
  );
};

export default Index;
