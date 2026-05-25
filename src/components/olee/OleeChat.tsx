import { useState } from "react";
import { LivingOlee } from "./LivingOlee";
import { OleeMood } from "./OleeContent";

interface Props {
  onDone: () => void;
}

const Q1_OPTIONS = [
  { t: "He's happy!", reply: "Yay! Olee loves happy stories!", mood: "glowing" as OleeMood },
  { t: "He's in trouble!", reply: "Oh no! We have to read more tomorrow to help him!", mood: "surprised" as OleeMood },
  { t: "Something funny!", reply: "Haha! Tell me more tomorrow!", mood: "laughing" as OleeMood },
  { t: "It's a secret!", reply: "Ooh, a mystery! Olee will think about it all night!", mood: "thinking" as OleeMood },
];

const EMOJIS = [
  { e: "😄", t: "So fun!", bg: "#FCEFD2" },
  { e: "😮", t: "Surprising!", bg: "#DDEAF7" },
  { e: "😢", t: "Kind of sad", bg: "#EEEDFE" },
  { e: "🤯", t: "Mind-blowing!", bg: "#FCE3DD" },
  { e: "😊", t: "Loved it!", bg: "#DEF1E5" },
];

export const OleeChat = ({ onDone }: Props) => {
  const [step, setStep] = useState<"ask" | "react" | "emoji" | "more">("ask");
  const [picked, setPicked] = useState<typeof Q1_OPTIONS[number] | null>(null);
  const [emoji, setEmoji] = useState<string | null>(null);

  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #d4f0e4 0%, #e4f3eb 40%, #f0f5e8 100%)",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Olee large in center */}
      <div className="flex justify-center pt-4 shrink-0">
        <LivingOlee mood={picked?.mood ?? "glowing"} size={130} />
      </div>

      {/* Chat content */}
      <div className="flex-1 px-4 overflow-y-auto scrollbar-hide space-y-2">
        {/* Q1 */}
        <div
          className="bg-white/95 rounded-2xl rounded-bl-md px-3 py-2.5 max-w-[80%] shadow-sm"
          style={{ borderColor: "#B5E4CC" }}
        >
          <p className="text-[13px] font-bold" style={{ color: "#2D5A45" }}>
            How's Charlotte's Web going? Is Wilbur okay?
          </p>
        </div>

        {step === "ask" && (
          <div className="space-y-2 pt-2">
            {Q1_OPTIONS.map((o) => (
              <button
                key={o.t}
                onClick={() => { setPicked(o); setStep("react"); }}
                className="w-full bg-white border-2 px-3 py-2.5 rounded-2xl text-[13px] font-bold text-left active:scale-[0.99] transition"
                style={{ borderColor: "#B5E4CC", color: "#2D5A45" }}
              >
                {o.t}
              </button>
            ))}
          </div>
        )}

        {step !== "ask" && picked && (
          <>
            {/* child reply */}
            <div className="flex justify-end pt-1">
              <div className="bg-primary text-white rounded-2xl rounded-br-md px-3 py-2 text-[13px] font-bold max-w-[75%]">
                {picked.t}
              </div>
            </div>

            {/* Olee reaction */}
            <div className="bg-white/95 rounded-2xl rounded-bl-md px-3 py-2.5 max-w-[80%] shadow-sm">
              <p className="text-[13px] font-bold" style={{ color: "#2D5A45" }}>{picked.reply}</p>
            </div>

            {step === "react" && (
              <div className="pt-3">
                <button
                  onClick={() => setStep("emoji")}
                  className="w-full bg-primary text-white py-2.5 rounded-2xl font-extrabold text-[14px] active:scale-[0.98]"
                >
                  Next
                </button>
              </div>
            )}

            {(step === "emoji" || step === "more") && (
              <>
                <div className="bg-white/95 rounded-2xl rounded-bl-md px-3 py-2.5 max-w-[80%] shadow-sm">
                  <p className="text-[13px] font-bold" style={{ color: "#2D5A45" }}>
                    How did the story make you feel?
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {EMOJIS.map((em) => (
                    <button
                      key={em.t}
                      onClick={() => setEmoji(em.t)}
                      className="rounded-2xl px-2 py-2 flex flex-col items-center active:scale-95 transition"
                      style={{
                        background: em.bg,
                        outline: emoji === em.t ? "2.5px solid #5BAF85" : "none",
                      }}
                    >
                      <span className="text-[24px]">{em.e}</span>
                      <span className="text-[10px] font-extrabold" style={{ color: "#2D5A45" }}>{em.t}</span>
                    </button>
                  ))}
                </div>
                {emoji && (
                  <button
                    onClick={() => setStep("more")}
                    className="text-[11px] font-bold mt-1"
                    style={{ color: "#5BAF85" }}
                  >
                    Want to tell Olee more? ✏️
                  </button>
                )}
                {step === "more" && (
                  <textarea
                    placeholder="Tell Olee anything..."
                    className="w-full bg-white border-2 rounded-2xl px-3 py-2 text-[13px] font-semibold outline-none mt-1"
                    style={{ borderColor: "#B5E4CC", color: "#2D5A45", minHeight: 60 }}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 shrink-0 bg-white/60 backdrop-blur-sm">
        {emoji ? (
          <button
            onClick={onDone}
            className="w-full bg-primary text-white py-3 rounded-2xl font-extrabold text-[14px] active:scale-[0.98]"
          >
            Done for today 💚
          </button>
        ) : (
          <button
            onClick={onDone}
            className="w-full text-center text-[12px] font-bold py-2"
            style={{ color: "#888" }}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

export default OleeChat;
