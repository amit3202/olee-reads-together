import { cn } from "@/lib/utils";

type Pose = "wave" | "reading" | "books" | "celebrate" | "thinking" | "calm" | "peek";
type Expression = "happy" | "excited" | "calm" | "proud";

interface OleeProps {
  pose?: Pose;
  expression?: Expression;
  size?: number;
  className?: string;
}

/* Olee: rounded green sprout mascot. Eyes/mouth/arms vary by pose. */
export const Olee = ({ pose = "wave", expression = "happy", size = 160, className }: OleeProps) => {
  const eyesClosed = pose === "calm" || expression === "calm" || expression === "proud";
  const mouthOpen = expression === "excited" || pose === "celebrate" || pose === "wave";

  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={(size * 220) / 200}
      className={cn("select-none", className)}
      aria-label="Olee mascot"
    >
      {/* shadow */}
      <ellipse cx="100" cy="208" rx="56" ry="6" fill="#2D5A45" opacity="0.08" />

      {/* sprout */}
      <g>
        <path d="M100 38 C 100 24, 100 12, 100 6" stroke="#2D5A45" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M100 18 C 88 14, 80 18, 78 28 C 88 30, 96 26, 100 18 Z" fill="#2D5A45" />
        <path d="M100 24 C 112 20, 120 24, 122 34 C 112 36, 104 32, 100 24 Z" fill="#3a6e58" />
      </g>

      {/* body */}
      <ellipse cx="100" cy="120" rx="78" ry="78" fill="#8AD4B0" />
      <ellipse cx="100" cy="118" rx="78" ry="78" fill="url(#bodyShade)" opacity="0.35" />

      {/* belly patch */}
      <ellipse cx="100" cy="128" rx="42" ry="50" fill="#FDFCF9" />
      {/* tree symbol on belly */}
      <g stroke="#2D5A45" strokeWidth="4" strokeLinecap="round" fill="none">
        <line x1="100" y1="108" x2="100" y2="156" />
        <line x1="100" y1="124" x2="86" y2="116" />
        <line x1="100" y1="124" x2="114" y2="116" />
      </g>

      {/* cheeks */}
      <ellipse cx="58" cy="128" rx="8" ry="5" fill="#F4A89B" opacity="0.75" />
      <ellipse cx="142" cy="128" rx="8" ry="5" fill="#F4A89B" opacity="0.75" />

      {/* eyes */}
      {eyesClosed ? (
        <>
          <path d="M64 108 Q72 102 80 108" stroke="#2D5A45" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M120 108 Q128 102 136 108" stroke="#2D5A45" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx="72" cy="108" rx="7" ry="9" fill="#2D5A45" />
          <ellipse cx="128" cy="108" rx="7" ry="9" fill="#2D5A45" />
          <circle cx="74" cy="105" r="2.2" fill="#fff" />
          <circle cx="130" cy="105" r="2.2" fill="#fff" />
        </>
      )}

      {/* mouth */}
      {mouthOpen ? (
        <ellipse cx="100" cy="142" rx="6" ry="5" fill="#E8836B" />
      ) : (
        <path d="M94 142 Q100 147 106 142" stroke="#E8836B" strokeWidth="3" strokeLinecap="round" fill="none" />
      )}

      {/* arms / pose accessories */}
      {pose === "wave" && (
        <>
          <ellipse cx="30" cy="140" rx="14" ry="18" fill="#8AD4B0" transform="rotate(-20 30 140)" />
          <ellipse cx="170" cy="100" rx="14" ry="18" fill="#8AD4B0" transform="rotate(35 170 100)" />
        </>
      )}
      {pose === "reading" && (
        <>
          {/* book */}
          <g transform="translate(60 150)">
            <rect x="0" y="0" width="80" height="40" rx="4" fill="#F4C542" />
            <rect x="38" y="0" width="4" height="40" fill="#D9A82E" />
            <line x1="10" y1="12" x2="34" y2="12" stroke="#fff" strokeWidth="2" opacity="0.7" />
            <line x1="10" y1="22" x2="34" y2="22" stroke="#fff" strokeWidth="2" opacity="0.7" />
            <line x1="46" y1="12" x2="70" y2="12" stroke="#fff" strokeWidth="2" opacity="0.7" />
            <line x1="46" y1="22" x2="70" y2="22" stroke="#fff" strokeWidth="2" opacity="0.7" />
          </g>
          {/* hands holding book */}
          <ellipse cx="56" cy="160" rx="12" ry="14" fill="#8AD4B0" />
          <ellipse cx="144" cy="160" rx="12" ry="14" fill="#8AD4B0" />
        </>
      )}
      {pose === "books" && (
        <>
          <ellipse cx="40" cy="130" rx="12" ry="16" fill="#8AD4B0" transform="rotate(-15 40 130)" />
          <ellipse cx="160" cy="130" rx="12" ry="16" fill="#8AD4B0" transform="rotate(15 160 130)" />
          <g transform="translate(70 110)">
            <rect width="60" height="14" rx="3" fill="#E8836B" />
            <rect y="16" width="60" height="14" rx="3" fill="#F4C542" />
            <rect y="32" width="60" height="14" rx="3" fill="#5BAF85" />
          </g>
        </>
      )}
      {pose === "celebrate" && (
        <>
          <ellipse cx="26" cy="80" rx="12" ry="16" fill="#8AD4B0" transform="rotate(-30 26 80)" />
          <ellipse cx="174" cy="80" rx="12" ry="16" fill="#8AD4B0" transform="rotate(30 174 80)" />
          {/* sparkles */}
          <g fill="#EF9F27">
            <circle cx="20" cy="50" r="3" />
            <circle cx="180" cy="55" r="3" />
            <path d="M40 30 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 z" />
          </g>
        </>
      )}
      {pose === "thinking" && (
        <>
          <ellipse cx="38" cy="135" rx="12" ry="16" fill="#8AD4B0" transform="rotate(-10 38 135)" />
          <ellipse cx="148" cy="100" rx="12" ry="14" fill="#8AD4B0" />
        </>
      )}
      {pose === "calm" && (
        <>
          <ellipse cx="34" cy="140" rx="12" ry="16" fill="#8AD4B0" />
          <ellipse cx="166" cy="140" rx="12" ry="16" fill="#8AD4B0" />
        </>
      )}
      {pose === "peek" && (
        <ellipse cx="160" cy="120" rx="12" ry="14" fill="#8AD4B0" />
      )}

      {/* feet */}
      <ellipse cx="76" cy="200" rx="14" ry="8" fill="#6dbf95" />
      <ellipse cx="124" cy="200" rx="14" ry="8" fill="#6dbf95" />

      <defs>
        <radialGradient id="bodyShade" cx="0.7" cy="0.8" r="0.8">
          <stop offset="0%" stopColor="#5BAF85" stopOpacity="0" />
          <stop offset="100%" stopColor="#2D5A45" stopOpacity="0.4" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Olee;
