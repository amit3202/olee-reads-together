import { useRef, useState } from "react";
import { Olee } from "@/components/Olee";
import { BottomNav } from "@/components/BottomNav";
import {
  ArrowRight, ArrowLeft, Play, Pause, Flame, Star, BookOpen,
  CheckCircle2, ChevronRight, ShieldCheck, Sparkles, Mail, Bell,
  User, Crown, LogOut, HelpCircle, ChevronLeft, Check, Calendar,
  Heart, Pencil, Clock, AlertCircle, Plus, Minus, Bookmark, Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Screen =
  | "splash" | "welcome" | "setup1" | "setup2" | "setupDone" | "today"
  | "timer" | "celebrate" | "storyNote" | "progress" | "progressDetails"
  | "stories" | "story" | "storyRead" | "missed" | "oleeGrowth" | "oleeLibrary"
  | "login" | "settings" | "editChild" | "subscription"
  | "notifDaily" | "notifMissed" | "notifWeekly" | "formErrors"
  | "evolution" | "weeklyStory";

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
    { id: "oleeGrowth", label: "22. Olee growth" },
    { id: "evolution", label: "23. Evolution" },
    { id: "weeklyStory", label: "24. Weekly story" },
    { id: "oleeLibrary", label: "25. Olee library" },
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
            {screen === "progress" && <Progress tab={tab} setTab={goTab} onDetails={() => setScreen("progressDetails")} onOlee={() => setScreen("oleeGrowth")} />}
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
            {screen === "oleeGrowth" && <OleeGrowth onBack={() => setScreen("progress")} />}
            {screen === "evolution" && <EvolutionScreen onContinue={() => setScreen("celebrate")} />}
            {screen === "weeklyStory" && <WeeklyStoryScreen onContinue={() => { setTab("today"); setScreen("today"); }} />}
            {screen === "oleeLibrary" && <OleeLibrary onBack={() => setScreen("oleeGrowth")} />}
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

/* ---------- Olee growth stages ---------- */
const OLEE_STAGES = [
  { name: "Seedling Olee", min: 0, max: 10 },
  { name: "Sapling Olee", min: 11, max: 25 },
  { name: "Bloom Olee", min: 26, max: 50 },
  { name: "Blossom Olee", min: 51, max: 100 },
  { name: "Tree Olee", min: 101, max: 200 },
  { name: "Mighty Oak Olee", min: 201, max: 999 },
];
const getStage = (stars: number) => {
  const idx = OLEE_STAGES.findIndex((s) => stars >= s.min && stars <= s.max);
  const i = idx === -1 ? OLEE_STAGES.length - 1 : idx;
  const cur = OLEE_STAGES[i];
  const next = OLEE_STAGES[i + 1];
  const progress = next ? (stars - cur.min) / (next.min - cur.min) : 1;
  const toNext = next ? next.min - stars : 0;
  return { cur, next, progress: Math.min(1, Math.max(0, progress)), toNext, index: i };
};

/* ---------- Today's Adventures ---------- */
const ADVENTURES = [
  { icon: "🔍", t: "Mystery Hunt", s: "Find a word you've never seen before!", bg: "#DDEAF7", q: "Did you find a mystery word? 🔍" },
  { icon: "🎭", t: "Character Day", s: "Pick your favorite character and imagine being them", bg: "#FCE3DD", q: "Who was your favorite character? 🎭" },
  { icon: "😮", t: "Surprise Seeker", s: "Look for something unexpected in the story", bg: "#DDEAF7", q: "What surprised you? 😮" },
  { icon: "🌈", t: "Imagination Spark", s: "What would YOU do if you were in this story?", bg: "#DEF1E5", q: "What would you have done? 🌈" },
  { icon: "💬", t: "Quote Catcher", s: "Find a sentence that sounds really cool", bg: "#FCEFD2", q: "Got a cool line for Olee? 💬" },
  { icon: "🗺️", t: "World Explorer", s: "Where does today's story happen? Picture it!", bg: "#DDEAF7", q: "Where did the story take you? 🗺️" },
  { icon: "🧩", t: "Prediction Time", s: "Guess what might happen next!", bg: "#EEEDFE", q: "Was your guess right? 🧩" },
  { icon: "👀", t: "Detail Detective", s: "Notice something small that others might miss", bg: "#DDEAF7", q: "What did you spot? 👀" },
  { icon: "😊", t: "Feeling Finder", s: "How does the main character feel right now?", bg: "#EEEDFE", q: "How was the character feeling? 😊" },
  { icon: "🎨", t: "Picture Painter", s: "Imagine the scene in your head as a painting", bg: "#FCE3DD", q: "What did your picture look like? 🎨" },
];
const todayAdventure = () => ADVENTURES[new Date().getDate() % ADVENTURES.length];

const Today = ({ onStart, onStories, tab, setTab }: any) => {
  const [duration, setDuration] = useState(15);
  const dec = () => setDuration((d) => Math.max(15, d - 5));
  const inc = () => setDuration((d) => Math.min(60, d + 5));
  const mm = String(duration).padStart(2, "0");
  const stars = 18; // demo
  const stage = getStage(stars);
  const adv = todayAdventure();
  return (
    <div className="w-full h-full flex flex-col">
      {/* New header: Olee growth + streak */}
      <div className="px-5 pt-2 pb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="animate-float shrink-0">
            <Olee pose="wave" expression="excited" size={64} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-extrabold tracking-wider text-primary">HI AARAV!</p>
            <h2 className="text-base font-display leading-tight">{stage.cur.name}</h2>
            <div className="mt-1.5 h-2 w-full bg-primary-light rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all" style={{ width: `${stage.progress * 100}%` }} />
            </div>
            {stage.next && (
              <p className="text-[10px] font-extrabold text-accent mt-1">
                {stage.toNext} stars to {stage.next.name.replace(" Olee", "")}!
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-accent-soft px-2.5 py-1.5 rounded-full shrink-0">
          <Flame size={14} className="text-accent" fill="currentColor" />
          <span className="text-xs font-extrabold text-accent">7</span>
        </div>
      </div>

      <div className="px-5 flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {/* Today's Adventure card */}
        <div className="rounded-2xl p-3 flex items-center gap-3 mb-3" style={{ background: adv.bg }}>
          <div className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center text-xl shrink-0">
            {adv.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-extrabold tracking-wider text-foreground/60">TODAY'S ADVENTURE</p>
            <p className="text-sm font-display text-foreground leading-tight">{adv.t}</p>
            <p className="text-[11px] font-bold text-foreground/70 leading-snug">{adv.s}</p>
          </div>
          <div className="shrink-0 -mr-1">
            <Olee pose="thinking" size={44} />
          </div>
        </div>

        <div className="bg-card border-2 border-primary/30 rounded-3xl p-5 shadow-[0_10px_30px_-15px_rgba(91,175,133,0.4)]">
          <p className="text-[11px] font-extrabold tracking-wider text-primary">WHAT ARE WE READING TODAY?</p>
          <div className="mt-2">
            <input
              placeholder="Type book name..."
              className="w-full bg-primary-light border-2 border-dashed border-primary/40 rounded-xl px-3 py-2.5 text-sm font-semibold placeholder:text-primary/50 outline-none focus:bg-card"
            />
          </div>

          <div className="mt-5 text-center">
            <p className="text-5xl font-display text-foreground tracking-tight">{mm}:00</p>
            <p className="text-xs font-bold text-muted-foreground mt-1">Olee is ready to grow with you!</p>
          </div>

          <div className="mt-3 flex items-center justify-center gap-3">
            <button onClick={dec} disabled={duration <= 15} aria-label="Decrease minutes"
              className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold disabled:opacity-40 active:scale-95 transition">
              <Minus size={18} />
            </button>
            <div className="flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-full">
              <Clock size={14} className="text-muted-foreground" />
              <span className="text-xs font-extrabold text-foreground tracking-wide">{duration} MIN</span>
            </div>
            <button onClick={inc} disabled={duration >= 60} aria-label="Increase minutes"
              className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold disabled:opacity-40 active:scale-95 transition">
              <Plus size={18} />
            </button>
          </div>

          <div className="mt-4 flex flex-col items-center gap-2">
            <button onClick={onStart}
              className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center pulse-ring shadow-lg active:scale-95 transition">
              <Play size={36} fill="currentColor" className="ml-1" />
            </button>
            <p className="text-sm font-extrabold text-primary">Grow today's flower!</p>
          </div>
        </div>

        <button onClick={onStories}
          className="mt-4 w-full bg-card rounded-3xl p-4 flex items-center gap-3 border-2 border-accent/30 active:scale-[0.99] transition">
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
};

const READING_PROMPTS = [
  { icon: "💭", t: "What might happen next?" },
  { icon: "👀", t: "Picture the scene in your head." },
  { icon: "❤️", t: "How is the character feeling?" },
  { icon: "🔎", t: "Spot a word you don't know." },
  { icon: "🗣️", t: "Read this page out loud!" },
];

const Timer = ({ onDone, onBack }: any) => {
  // Progress at ~31% (10:24 / 15:00)
  const progress = 0.31;
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const angle = -Math.PI / 2 + progress * 2 * Math.PI;
  const cx = 160 + radius * Math.cos(angle);
  const cy = 160 + radius * Math.sin(angle);

  const [promptIdx, setPromptIdx] = useState(0);
  const [pages, setPages] = useState(7);
  const [tricky, setTricky] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const prompt = READING_PROMPTS[promptIdx];

  return (
    <div className="w-full h-full flex flex-col items-center px-5 pt-2 pb-4 bg-gradient-to-b from-primary-light/60 to-background overflow-y-auto scrollbar-hide">
      <div className="w-full flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <div className="text-center">
          <p className="text-[10px] font-extrabold tracking-wider text-primary">READING WITH OLEE</p>
          <p className="text-sm font-extrabold text-foreground">The Tiger Who Came to Tea</p>
          <p className="text-[10px] font-bold text-muted-foreground">Chapter 2 · p.14</p>
        </div>
        <button
          onClick={() => setBookmarked((b) => !b)}
          aria-label="Bookmark moment"
          className={cn(
            "w-10 h-10 rounded-full border flex items-center justify-center transition",
            bookmarked ? "bg-accent text-accent-foreground border-accent" : "bg-card border-border text-muted-foreground"
          )}
        >
          <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="relative mt-4" style={{ width: 280, height: 280 }}>
        <svg width="280" height="280" className="-rotate-90" viewBox="0 0 320 320">
          {/* outer streak ring */}
          <circle cx="160" cy="160" r={radius + 16} stroke="hsl(var(--accent) / 0.15)" strokeWidth="6" fill="none" />
          <circle
            cx="160" cy="160" r={radius + 16}
            stroke="hsl(var(--accent))" strokeWidth="6" fill="none" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * (radius + 16)}
            strokeDashoffset={2 * Math.PI * (radius + 16) * (1 - 7 / 8)}
          />
          {/* main timer ring */}
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
        {/* Olee on the ring (animated) */}
        <div
          className="absolute animate-float"
          style={{ left: (cx - 38) * (280 / 320), top: (cy - 50) * (280 / 320) }}
        >
          <Olee pose="reading" size={66} />
        </div>
        {/* time inside */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-5xl font-display text-foreground tracking-tight">10:24</p>
          <p className="text-[10px] font-bold text-muted-foreground mt-0.5">REMAINING</p>
          <div className="mt-1 flex items-center gap-1 bg-accent-soft px-2 py-0.5 rounded-full">
            <Flame size={11} className="text-accent" fill="currentColor" />
            <span className="text-[10px] font-extrabold text-accent">Day 8 of streak</span>
          </div>
        </div>
      </div>

      {/* Rotating reading prompt */}
      <button
        onClick={() => setPromptIdx((i) => (i + 1) % READING_PROMPTS.length)}
        className="mt-3 w-full bg-card border-2 border-primary/20 rounded-2xl px-4 py-2.5 flex items-center gap-3 active:scale-[0.99] transition"
      >
        <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center text-lg">
          {prompt.icon}
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-[10px] font-extrabold tracking-wider text-primary">OLEE WHISPERS</p>
          <p className="text-sm font-bold text-foreground truncate">{prompt.t}</p>
        </div>
        <Lightbulb size={16} className="text-accent shrink-0" />
      </button>

      {/* Quick actions */}
      <div className="mt-3 w-full grid grid-cols-3 gap-2">
        <button
          onClick={() => setPages((p) => p + 1)}
          className="bg-card border border-border rounded-2xl py-2 flex flex-col items-center gap-0.5 active:scale-95 transition"
        >
          <BookOpen size={18} className="text-primary" />
          <span className="text-[10px] font-extrabold text-foreground">+1 page</span>
          <span className="text-[9px] font-bold text-muted-foreground">{pages} read</span>
        </button>
        <button
          onClick={() => setTricky((t) => t + 1)}
          className="bg-card border border-border rounded-2xl py-2 flex flex-col items-center gap-0.5 active:scale-95 transition"
        >
          <AlertCircle size={18} className="text-coral" />
          <span className="text-[10px] font-extrabold text-foreground">Tricky word</span>
          <span className="text-[9px] font-bold text-muted-foreground">{tricky} saved</span>
        </button>
        <button
          className="bg-card border border-border rounded-2xl py-2 flex flex-col items-center gap-0.5 active:scale-95 transition"
        >
          <Plus size={18} className="text-accent" />
          <span className="text-[10px] font-extrabold text-foreground">+5 min</span>
          <span className="text-[9px] font-bold text-muted-foreground">stretch it</span>
        </button>
      </div>

      {/* Pause / End */}
      <div className="mt-3 flex items-center gap-4">
        <button
          onClick={onDone}
          className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg active:scale-95"
          aria-label="Pause"
        >
          <Pause size={22} fill="currentColor" />
        </button>
        <button
          onClick={onDone}
          className="px-4 h-11 rounded-full bg-card border border-border text-xs font-extrabold text-muted-foreground active:scale-95"
        >
          End early
        </button>
      </div>

      <p className="mt-2 text-xs italic text-muted-foreground">Olee is cheering Aarav on...</p>
    </div>
  );
};

const Celebrate = ({ onProgress, onDone, onNote }: any) => (
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

    <button
      onClick={onNote}
      className="mt-4 w-full bg-accent-soft border-2 border-dashed border-accent/50 rounded-2xl p-4 flex items-center gap-3 text-left active:scale-[0.99] transition"
    >
      <div className="shrink-0">
        <Olee pose="thinking" size={56} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-extrabold tracking-wider text-accent">OLEE WANTS TO KNOW</p>
        <p className="text-sm font-bold text-foreground mt-0.5 leading-snug">
          What was the coolest thing in your story today?
        </p>
      </div>
      <Pencil size={18} className="text-accent shrink-0" />
    </button>

    <div className="w-full mt-auto space-y-2 pt-4">
      <PrimaryBtn onClick={onProgress}>See my progress</PrimaryBtn>
      <OutlineBtn onClick={onDone}>Done for today</OutlineBtn>
    </div>
  </div>
);

const StoryNote = ({ onBack, onSave }: any) => {
  const [text, setText] = useState("");
  const prompts = [
    "My favorite part was...",
    "The coolest character was...",
    "It made me feel...",
  ];
  return (
    <div className="w-full h-full flex flex-col px-6 pt-2 pb-6 bg-gradient-to-b from-accent-soft/60 to-background">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <p className="text-[10px] font-extrabold tracking-wider text-accent">STORY NOTE</p>
        <div className="w-10" />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <Olee pose="thinking" size={72} />
        <div>
          <h2 className="text-xl font-display leading-tight">Tell Olee about it!</h2>
          <p className="text-xs font-semibold text-muted-foreground mt-0.5">
            The coolest thing from your story today
          </p>
        </div>
      </div>

      <div className="mt-4 flex-1 flex flex-col">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="It was the best when..."
          className="flex-1 w-full bg-card border-2 border-dashed border-accent/40 rounded-2xl p-4 text-sm font-semibold placeholder:text-muted-foreground/70 outline-none focus:border-accent resize-none"
          maxLength={280}
        />
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {prompts.map((p) => (
              <button
                key={p}
                onClick={() => setText((t) => (t ? t : p + " "))}
                className="text-[10px] font-bold text-accent bg-accent-soft px-2 py-1 rounded-full active:scale-95"
              >
                {p}
              </button>
            ))}
          </div>
          <span className="text-[10px] font-bold text-muted-foreground">{text.length}/280</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <PrimaryBtn onClick={onSave}>
          <Check size={18} /> Save for Olee
        </PrimaryBtn>
        <OutlineBtn onClick={onBack}>Maybe later</OutlineBtn>
      </div>
    </div>
  );
};

const Progress = ({ tab, setTab, onDetails, onOlee }: any) => {
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

        <button
          onClick={onOlee}
          className="mt-3 w-full bg-gradient-to-br from-primary-light to-accent-soft border border-primary/20 rounded-2xl p-4 flex items-center gap-3 text-left active:scale-[0.99] transition"
        >
          <div className="relative w-14 h-14 shrink-0">
            <div className="absolute inset-0 rounded-full bg-primary/15 animate-float" />
            <div className="absolute inset-0 grid place-items-center">
              <Olee size={52} pose="wave" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-extrabold tracking-wider text-primary">OLEE'S GROWTH</p>
            <p className="font-display text-foreground text-base leading-tight">Sapling Olee</p>
            <p className="text-[11px] text-muted-foreground font-semibold">1 more story to bloom</p>
          </div>
          <ChevronRight size={18} className="text-foreground/50" />
        </button>

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
const HISTORY_START_DATE = new Date(2026, 2, 12);
const HISTORY_TODAY = new Date(2026, 4, 22);
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHLY_BOOKS: Record<string, { n: string; d: string; m: string }[]> = {
  "2026-5": [
    { n: "The Tiger Who Came to Tea", d: "May 6", m: "15 min" },
    { n: "Where the Wild Things Are", d: "May 5", m: "15 min" },
    { n: "Charlotte's Web (ch. 3)", d: "May 4", m: "18 min" },
    { n: "The Gruffalo", d: "May 3", m: "12 min" },
    { n: "Matilda (ch. 1)", d: "May 2", m: "15 min" },
    { n: "The Very Hungry Caterpillar", d: "May 1", m: "10 min" },
  ],
  "2026-4": [
    { n: "Charlotte's Web (ch. 2)", d: "Apr 28", m: "20 min" },
    { n: "Charlotte's Web (ch. 1)", d: "Apr 27", m: "20 min" },
    { n: "The BFG (ch. 4)", d: "Apr 22", m: "22 min" },
    { n: "The BFG (ch. 3)", d: "Apr 21", m: "22 min" },
    { n: "Stuart Little", d: "Apr 14", m: "18 min" },
    { n: "Goodnight Moon", d: "Apr 8", m: "10 min" },
  ],
  "2026-3": [
    { n: "Brown Bear, Brown Bear", d: "Mar 30", m: "10 min" },
    { n: "Corduroy", d: "Mar 22", m: "12 min" },
    { n: "The Snowy Day", d: "Mar 18", m: "12 min" },
    { n: "Guess How Much I Love You", d: "Mar 12", m: "10 min" },
  ],
};
const MONTHLY_NOTES: Record<string, { d: string; t: string }[]> = {
  "2026-5": [
    { d: "May 6", t: "I liked when the tiger drank ALL the tea!" },
    { d: "May 4", t: "Wilbur is the best pig ever." },
    { d: "May 2", t: "Matilda is so smart." },
    { d: "May 1", t: "The caterpillar ate too much fruit!" },
  ],
  "2026-4": [
    { d: "Apr 27", t: "Fern is so kind to Wilbur." },
    { d: "Apr 21", t: "The BFG makes funny dreams." },
    { d: "Apr 8", t: "I want to say goodnight to the moon too." },
  ],
  "2026-3": [
    { d: "Mar 22", t: "Corduroy is cute with one button." },
    { d: "Mar 12", t: "My first book! I love reading with mum." },
  ],
};

const ProgressDetails = ({ onBack }: { onBack: () => void }) => {
  const [view, setView] = useState({ y: HISTORY_TODAY.getFullYear(), m: HISTORY_TODAY.getMonth() });
  const minV = { y: HISTORY_START_DATE.getFullYear(), m: HISTORY_START_DATE.getMonth() };
  const maxV = { y: HISTORY_TODAY.getFullYear(), m: HISTORY_TODAY.getMonth() };
  const canPrev = view.y > minV.y || (view.y === minV.y && view.m > minV.m);
  const canNext = view.y < maxV.y || (view.y === maxV.y && view.m < maxV.m);
  const shift = (dir: number) => {
    const d = new Date(view.y, view.m + dir, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };
  const key = `${view.y}-${view.m}`;
  const books = MONTHLY_BOOKS[key] ?? [];
  const notes = MONTHLY_NOTES[key] ?? [];

  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const firstDow = new Date(view.y, view.m, 1).getDay();
  const cells: ({ day: number; status: "done" | "miss" | "future" | "pre" } | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(view.y, view.m, day);
    let status: "done" | "miss" | "future" | "pre" = "future";
    if (date < HISTORY_START_DATE) status = "pre";
    else if (date > HISTORY_TODAY) status = "future";
    else {
      const r = (day * 7) % 11;
      status = r < 7 ? "done" : "miss";
    }
    cells.push({ day, status });
  }

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
            <button onClick={() => canPrev && shift(-1)} disabled={!canPrev}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center disabled:opacity-30" aria-label="Previous month">
              <ChevronLeft size={16} />
            </button>
            <p className="text-sm font-display">{MONTH_NAMES[view.m]} {view.y}</p>
            <button onClick={() => canNext && shift(1)} disabled={!canNext}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center disabled:opacity-30" aria-label="Next month">
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="mt-3 flex gap-3 text-[10px] font-bold justify-center">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> Read</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-muted" /> Missed</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border border-dashed border-border" /> —</span>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-[9px] font-extrabold text-muted-foreground text-center">
            {["S","M","T","W","T","F","S"].map((d, i) => <div key={i}>{d}</div>)}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1.5">
            {cells.map((c, i) => (
              <div key={i} className={cn(
                "aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold",
                !c && "opacity-0",
                c?.status === "done" && "bg-primary text-primary-foreground",
                c?.status === "miss" && "bg-muted text-muted-foreground",
                c?.status === "future" && "bg-card border border-dashed border-border text-muted-foreground/50",
                c?.status === "pre" && "bg-card border border-border/50 text-muted-foreground/40"
              )}>{c?.day ?? ""}</div>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground text-center font-semibold">
            Reading since {MONTH_NAMES[HISTORY_START_DATE.getMonth()]} {HISTORY_START_DATE.getDate()}, {HISTORY_START_DATE.getFullYear()}
          </p>
        </div>

        <div className="mt-3 bg-card border border-border rounded-3xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">BOOK LOG · {MONTH_NAMES[view.m].toUpperCase()}</p>
            <span className="text-[10px] font-bold text-primary">{books.length} books</span>
          </div>
          {books.length === 0 ? (
            <p className="text-xs text-muted-foreground py-6 text-center font-semibold">No books logged this month.</p>
          ) : (
            <div className="max-h-56 overflow-y-auto pr-1">
              <ul className="divide-y divide-border">
                {books.map((b, i) => (
                  <li key={i} className="py-2.5 flex items-center gap-3">
                    <BookOpen size={16} className="text-primary shrink-0" />
                    <p className="flex-1 text-sm font-bold truncate">{b.n}</p>
                    <p className="text-[11px] text-muted-foreground font-semibold whitespace-nowrap">{b.d} · {b.m}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-3 bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">REFLECTION NOTES · {MONTH_NAMES[view.m].toUpperCase()}</p>
            <span className="text-[10px] font-bold text-primary">{notes.length}</span>
          </div>
          {notes.length === 0 ? (
            <p className="text-xs text-muted-foreground py-6 text-center font-semibold">No reflections this month.</p>
          ) : (
            <div className="max-h-56 overflow-y-auto pr-1">
              <div className="space-y-2.5">
                {notes.map((j, i) => (
                  <div key={i} className="bg-muted/50 rounded-lg p-3">
                    <p className="text-[10px] font-bold text-muted-foreground">{j.d}</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">"{j.t}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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

/* ---------- Olee growth (22) ---------- */
type OleeStage = {
  key: string;
  name: string;
  tagline: string;
  minStars: number;
  pose: "wave" | "reading" | "books" | "celebrate" | "thinking" | "calm" | "peek";
  ring: string;
  badge: string;
  accent: "leaf" | "spark" | "crown" | "cape" | "halo" | null;
};

const OLEE_STAGES: OleeStage[] = [
  { key: "seed",   name: "Seedling Olee", tagline: "Just sprouted — every story helps me grow.", minStars: 0,   pose: "calm",      ring: "bg-primary/10",     badge: "from-primary-soft/40 to-primary-light",  accent: null },
  { key: "sap",    name: "Sapling Olee",  tagline: "Reading buddy in training.",                  minStars: 10,  pose: "wave",      ring: "bg-primary/15",     badge: "from-primary-soft/60 to-primary-light",  accent: "leaf" },
  { key: "bloom",  name: "Bloom Olee",    tagline: "Blossoming with every chapter.",              minStars: 25,  pose: "reading",   ring: "bg-accent/15",      badge: "from-accent-soft to-primary-light",      accent: "spark" },
  { key: "super",  name: "Super Olee",    tagline: "Cape on. Imagination unlocked.",              minStars: 50,  pose: "celebrate", ring: "bg-accent/20",      badge: "from-accent-soft to-accent/20",          accent: "cape" },
  { key: "awe",    name: "Awesome Olee",  tagline: "A storytelling legend with the golden crown.", minStars: 100, pose: "books",     ring: "bg-[#F4C542]/25",   badge: "from-[#FFF3D0] to-[#F4C542]/40",         accent: "crown" },
  { key: "myth",   name: "Mythic Olee",   tagline: "Glowing with the wisdom of 200+ stories.",    minStars: 200, pose: "thinking",  ring: "bg-coral/20",       badge: "from-[#FCE3DD] to-coral/30",             accent: "halo" },
];

const OleeAvatar = ({ stage, size = 120 }: { stage: OleeStage; size?: number }) => (
  <div className="relative grid place-items-center" style={{ width: size + 24, height: size + 24 }}>
    <div className={cn("absolute inset-0 rounded-full", stage.ring)} />
    {stage.accent === "halo" && (
      <div className="absolute inset-2 rounded-full border-2 border-coral/40 animate-pulse" />
    )}
    {stage.accent === "crown" && (
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 text-[#EF9F27]">
        <Crown size={26} fill="#F4C542" />
      </div>
    )}
    {stage.accent === "cape" && (
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-10 bg-coral rounded-b-[40px] -z-0 opacity-90" style={{ transform: "translate(-50%, 30%)" }} />
    )}
    {stage.accent === "spark" && (
      <>
        <Sparkles size={14} className="absolute top-2 right-3 text-accent" />
        <Sparkles size={10} className="absolute bottom-4 left-2 text-accent" />
      </>
    )}
    {stage.accent === "leaf" && (
      <div className="absolute top-1 right-2 w-3 h-3 rounded-full bg-primary-soft" />
    )}
    <Olee size={size} pose={stage.pose} />
  </div>
);

const OleeGrowth = ({ onBack }: { onBack: () => void }) => {
  const stars = 24;
  const currentIdx = Math.max(0, OLEE_STAGES.findIndex((s, i) =>
    stars >= s.minStars && (i === OLEE_STAGES.length - 1 || stars < OLEE_STAGES[i + 1].minStars)
  ));
  const current = OLEE_STAGES[currentIdx];
  const next = OLEE_STAGES[currentIdx + 1];
  const progress = next
    ? Math.round(((stars - current.minStars) / (next.minStars - current.minStars)) * 100)
    : 100;
  const toNext = next ? next.minStars - stars : 0;

  return (
    <div className="w-full h-full flex flex-col bg-muted/30">
      <div className="px-4 pt-2 pb-3 flex items-center gap-2">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-card border border-border grid place-items-center">
          <ChevronLeft size={18} />
        </button>
        <div>
          <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">AARAV'S BUDDY</p>
          <h2 className="text-xl font-display text-foreground leading-tight">Olee's growth</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 scrollbar-hide">
        {/* Hero */}
        <div className={cn("rounded-3xl p-5 bg-gradient-to-br border border-primary/15", current.badge)}>
          <div className="flex flex-col items-center text-center">
            <OleeAvatar stage={current} size={140} />
            <p className="mt-3 text-[10px] font-extrabold tracking-wider text-primary">STAGE {currentIdx + 1} OF {OLEE_STAGES.length}</p>
            <h3 className="font-display text-2xl text-foreground">{current.name}</h3>
            <p className="text-sm text-foreground/70 font-semibold mt-1 max-w-[260px]">{current.tagline}</p>
          </div>

          {next && (
            <div className="mt-5 bg-card/80 backdrop-blur rounded-2xl p-3.5 border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-foreground">Next: {next.name}</p>
                <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> {toNext} to go
                </span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary-soft transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-[11px] text-muted-foreground font-semibold mt-2">{stars} / {next.minStars} stars</p>
            </div>
          )}
        </div>

        {/* Journey */}
        <div className="mt-5">
          <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground mb-3">THE GROWTH JOURNEY</p>
          <div className="space-y-3">
            {OLEE_STAGES.map((s, i) => {
              const unlocked = i <= currentIdx;
              const isCurrent = i === currentIdx;
              return (
                <div
                  key={s.key}
                  className={cn(
                    "rounded-2xl p-3 flex items-center gap-3 border transition",
                    isCurrent ? "bg-card border-primary shadow-[0_6px_20px_-12px_hsl(var(--primary)/0.6)]" :
                    unlocked ? "bg-card border-border" :
                    "bg-card/50 border-dashed border-border"
                  )}
                >
                  <div className={cn("shrink-0 transition", !unlocked && "grayscale opacity-50")}>
                    <OleeAvatar stage={s} size={56} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-foreground text-base truncate">{s.name}</p>
                      {isCurrent && (
                        <span className="text-[9px] font-extrabold tracking-wider bg-primary text-primary-foreground px-1.5 py-0.5 rounded">NOW</span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground font-semibold truncate">{s.tagline}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    {unlocked ? (
                      <CheckCircle2 size={18} className="text-primary inline" />
                    ) : (
                      <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> {s.minStars}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tip */}
        <div className="mt-5 p-4 bg-primary-light rounded-2xl border border-primary/10 flex gap-3">
          <Heart size={18} className="text-coral shrink-0 mt-0.5" />
          <p className="text-xs text-foreground/80 font-semibold leading-relaxed">
            Every story Aarav finishes earns a star — and Olee grows along with him. Keep the streak alive to unlock the next form!
          </p>
        </div>
      </div>
    </div>
  );
};

/* ---------- Olee Library (23) — generic reference of every Olee variation ---------- */
type LibVariant = {
  key: string;
  name: string;
  usage: string;
  pose: "wave" | "reading" | "books" | "celebrate" | "thinking" | "calm" | "peek";
  expression?: "happy" | "excited" | "calm" | "proud";
  ring?: string;
  badge?: string;
  accent?: "leaf" | "spark" | "crown" | "cape" | "halo" | "hat" | "glasses" | "bow" | "snow" | "heart" | null;
  tag?: string;
};

const LIB_GROWTH: LibVariant[] = OLEE_STAGES.map((s) => ({
  key: `growth-${s.key}`,
  name: s.name,
  usage: `Unlocks at ${s.minStars}★ — ${s.tagline}`,
  pose: s.pose,
  ring: s.ring,
  badge: s.badge,
  accent: s.accent,
  tag: "Growth",
}));

const LIB_POSES: LibVariant[] = [
  { key: "p-wave", name: "Waving Olee", usage: "Greeting, splash, onboarding hero", pose: "wave", expression: "happy", tag: "Pose" },
  { key: "p-reading", name: "Reading Olee", usage: "Active reading sessions, timer screen", pose: "reading", expression: "happy", tag: "Pose" },
  { key: "p-books", name: "Books Olee", usage: "Story library, browse screen", pose: "books", expression: "happy", tag: "Pose" },
  { key: "p-celebrate", name: "Celebrating Olee", usage: "Completion, streaks, achievements", pose: "celebrate", expression: "excited", tag: "Pose" },
  { key: "p-thinking", name: "Thinking Olee", usage: "Prompts, reflections, story notes", pose: "thinking", expression: "calm", tag: "Pose" },
  { key: "p-calm", name: "Calm Olee", usage: "Bedtime, quiet states, loading", pose: "calm", expression: "calm", tag: "Pose" },
  { key: "p-peek", name: "Peeking Olee", usage: "Tooltips, empty states, nudges", pose: "peek", expression: "happy", tag: "Pose" },
];

const LIB_EXPRESSIONS: LibVariant[] = [
  { key: "e-happy", name: "Happy", usage: "Default friendly mood", pose: "wave", expression: "happy", tag: "Mood" },
  { key: "e-excited", name: "Excited", usage: "Big wins, unlocks", pose: "celebrate", expression: "excited", tag: "Mood" },
  { key: "e-calm", name: "Calm", usage: "Quiet moments, focus", pose: "calm", expression: "calm", tag: "Mood" },
  { key: "e-proud", name: "Proud", usage: "Praise, milestone reached", pose: "books", expression: "proud", tag: "Mood" },
];

const LIB_THEMED: LibVariant[] = [
  { key: "t-scholar", name: "Scholar Olee", usage: "Lessons, learning tips", pose: "reading", accent: "glasses", ring: "bg-primary/10", tag: "Themed" },
  { key: "t-party", name: "Party Olee", usage: "Birthdays, special events", pose: "celebrate", accent: "hat", ring: "bg-coral/15", tag: "Themed" },
  { key: "t-winter", name: "Winter Olee", usage: "Seasonal — December campaigns", pose: "calm", accent: "snow", ring: "bg-[#DDEAF7]/60", tag: "Themed" },
  { key: "t-gift", name: "Gift Olee", usage: "Referrals, rewards, surprises", pose: "wave", accent: "bow", ring: "bg-accent/15", tag: "Themed" },
  { key: "t-love", name: "Sweet Olee", usage: "Favorites, parent love notes", pose: "thinking", accent: "heart", ring: "bg-coral/15", tag: "Themed" },
  { key: "t-sparkle", name: "Sparkle Olee", usage: "New features, premium teasers", pose: "books", accent: "spark", ring: "bg-accent/15", tag: "Themed" },
  { key: "t-hero", name: "Hero Olee", usage: "Story-of-the-week, hero banners", pose: "celebrate", accent: "cape", ring: "bg-coral/15", tag: "Themed" },
  { key: "t-royal", name: "Royal Olee", usage: "Top reader, leaderboard winner", pose: "books", accent: "crown", ring: "bg-[#F4C542]/25", tag: "Themed" },
];

const LibAvatar = ({ v, size = 96 }: { v: LibVariant; size?: number }) => (
  <div className="relative grid place-items-center" style={{ width: size + 20, height: size + 20 }}>
    {v.ring && <div className={cn("absolute inset-0 rounded-full", v.ring)} />}
    {v.accent === "halo" && <div className="absolute inset-2 rounded-full border-2 border-coral/40 animate-pulse" />}
    {v.accent === "crown" && (
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 text-[#EF9F27]">
        <Crown size={22} fill="#F4C542" />
      </div>
    )}
    {v.accent === "cape" && (
      <div className="absolute bottom-2 left-1/2 w-[70%] h-8 bg-coral rounded-b-[40px] opacity-90" style={{ transform: "translate(-50%, 30%)" }} />
    )}
    {v.accent === "spark" && (
      <>
        <Sparkles size={12} className="absolute top-2 right-3 text-accent" />
        <Sparkles size={9} className="absolute bottom-4 left-2 text-accent" />
      </>
    )}
    {v.accent === "leaf" && <div className="absolute top-1 right-2 w-3 h-3 rounded-full bg-primary-soft" />}
    {v.accent === "hat" && (
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10">
        <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[16px] border-l-transparent border-r-transparent border-b-accent" />
      </div>
    )}
    {v.accent === "glasses" && (
      <div className="absolute z-10 flex gap-1" style={{ top: "38%" }}>
        <div className="w-3.5 h-3.5 rounded-full border-2 border-foreground bg-card/60" />
        <div className="w-3.5 h-3.5 rounded-full border-2 border-foreground bg-card/60" />
      </div>
    )}
    {v.accent === "bow" && (
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 flex items-center">
        <div className="w-2.5 h-2.5 rotate-45 bg-coral" />
        <div className="w-1.5 h-1.5 rounded-full bg-coral mx-0.5" />
        <div className="w-2.5 h-2.5 rotate-45 bg-coral" />
      </div>
    )}
    {v.accent === "snow" && (
      <>
        <div className="absolute top-1 left-3 w-1.5 h-1.5 rounded-full bg-card border border-primary/20" />
        <div className="absolute top-4 right-2 w-1 h-1 rounded-full bg-card border border-primary/20" />
        <div className="absolute bottom-3 left-2 w-1 h-1 rounded-full bg-card border border-primary/20" />
      </>
    )}
    {v.accent === "heart" && (
      <Heart size={14} className="absolute top-1 right-2 text-coral" fill="currentColor" />
    )}
    <Olee size={size} pose={v.pose} expression={v.expression} />
  </div>
);

const OleeLibrary = ({ onBack }: { onBack: () => void }) => {
  const groups: { title: string; subtitle: string; items: LibVariant[] }[] = [
    { title: "Growth stages", subtitle: "Unlocked as the child earns stars", items: LIB_GROWTH },
    { title: "Poses", subtitle: "Body language for each context", items: LIB_POSES },
    { title: "Expressions", subtitle: "Mood overlays — pair with any pose", items: LIB_EXPRESSIONS },
    { title: "Themed", subtitle: "Seasonal & special-event variants", items: LIB_THEMED },
  ];
  const [filter, setFilter] = useState<string>("All");
  const filters = ["All", ...groups.map((g) => g.title)];

  return (
    <div className="w-full h-full flex flex-col bg-muted/30">
      <div className="px-4 pt-2 pb-3 flex items-center gap-2 border-b border-border/60">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-card border border-border grid place-items-center">
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1">
          <p className="text-[10px] font-extrabold tracking-wider text-muted-foreground">DESIGN REFERENCE</p>
          <h2 className="text-xl font-display text-foreground leading-tight">Olee library</h2>
        </div>
        <span className="text-[10px] font-bold text-muted-foreground bg-card border border-border rounded-full px-2 py-1">
          {LIB_GROWTH.length + LIB_POSES.length + LIB_EXPRESSIONS.length + LIB_THEMED.length} variants
        </span>
      </div>

      <div className="px-4 py-3 flex gap-1.5 overflow-x-auto scrollbar-hide border-b border-border/60">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition",
              filter === f ? "bg-foreground text-background" : "bg-card text-foreground/70 border border-border"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-hide">
        {groups
          .filter((g) => filter === "All" || filter === g.title)
          .map((g) => (
            <section key={g.title}>
              <div className="mb-2.5">
                <p className="text-[10px] font-extrabold tracking-wider text-primary">{g.title.toUpperCase()}</p>
                <p className="text-xs text-muted-foreground font-semibold">{g.subtitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {g.items.map((v) => (
                  <div key={v.key} className="bg-card rounded-2xl p-3 border border-border flex flex-col items-center text-center">
                    <div className={cn("w-full rounded-xl grid place-items-center py-2 bg-gradient-to-br", v.badge || "from-primary-light to-muted/40")}>
                      <LibAvatar v={v} size={84} />
                    </div>
                    <p className="font-display text-sm text-foreground mt-2 leading-tight">{v.name}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold mt-1 leading-snug line-clamp-2">{v.usage}</p>
                    <span className="mt-2 text-[9px] font-extrabold tracking-wider text-primary bg-primary-light px-2 py-0.5 rounded-full">
                      {v.tag}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}

        <div className="p-4 bg-primary-light rounded-2xl border border-primary/10 flex gap-3">
          <Sparkles size={18} className="text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-foreground/80 font-semibold leading-relaxed">
            Use this library when building new screens — pick a variant by context, not vibe. Growth stages drive progression; poses drive screen intent; themed variants are for campaigns and moments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
