import { OleeMood } from "./OleeContent";

interface Props {
  mood?: OleeMood;
  size?: number;
  accessory?: "tophat" | "glasses" | "bowtie" | "scarf" | "crown" | "wizardhat" | null;
}

/**
 * Living Olee — mood-driven sprout character.
 * Eyes/mouth/sprout/cheek/floating elements change per mood.
 */
export const LivingOlee = ({ mood = "hopeful", size = 150, accessory = null }: Props) => {
  const eyesClosed = mood === "sleepy" || mood === "night" || mood === "laughing";
  const eyesHalf = mood === "cozy" || mood === "subdued";
  const eyesWide = mood === "glowing" || mood === "surprised";
  const mouthBig = mood === "glowing" || mood === "laughing";
  const mouthYawn = mood === "sleepy" || mood === "night";
  const mouthO = mood === "surprised";
  const sproutAngle = mood === "sleepy" ? -18 : mood === "subdued" ? -8 : mood === "glowing" ? 4 : 0;
  const cheekOpacity = mood === "subdued" ? 0.35 : mood === "glowing" ? 1 : 0.75;
  const bodyTilt = mood === "sleepy" ? -3 : mood === "subdued" ? 2 : 0;

  return (
    <svg
      viewBox="0 0 220 240"
      width={size}
      height={(size * 240) / 220}
      className="select-none animate-breathe"
      aria-label="Olee"
    >
      {/* shadow */}
      <ellipse cx="110" cy="228" rx="64" ry="7" fill="#2D5A45" opacity="0.1" />

      <g style={{ transform: `rotate(${bodyTilt}deg)`, transformOrigin: "110px 140px" }}>
        {/* sprout */}
        <g style={{ transform: `rotate(${sproutAngle}deg)`, transformOrigin: "110px 48px" }}>
          <path d="M110 50 C 110 32, 110 18, 110 10" stroke="#2D5A45" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M110 22 C 96 18, 86 22, 84 34 C 96 36, 104 30, 110 22 Z" fill="#2D5A45" />
          <path d="M110 30 C 124 26, 134 30, 136 42 C 124 44, 114 38, 110 30 Z" fill="#3a6e58" />
        </g>

        {/* body */}
        <ellipse cx="110" cy="140" rx="82" ry="80" fill="#8AD4B0" />
        <ellipse cx="110" cy="148" rx="46" ry="52" fill="#FDFCF9" />
        {/* tree on belly */}
        <g stroke="#2D5A45" strokeWidth="4" strokeLinecap="round" fill="none">
          <line x1="110" y1="128" x2="110" y2="178" />
          <line x1="110" y1="144" x2="94" y2="136" />
          <line x1="110" y1="144" x2="126" y2="136" />
        </g>

        {/* cheeks */}
        <ellipse cx="64" cy="148" rx="9" ry="6" fill="#F4A89B" opacity={cheekOpacity} />
        <ellipse cx="156" cy="148" rx="9" ry="6" fill="#F4A89B" opacity={cheekOpacity} />

        {/* eyes */}
        {eyesClosed ? (
          <>
            <path d="M70 126 Q80 120 90 126" stroke="#2D5A45" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M130 126 Q140 120 150 126" stroke="#2D5A45" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        ) : eyesHalf ? (
          <>
            <path d="M70 128 Q80 124 90 128" stroke="#2D5A45" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M130 128 Q140 124 150 128" stroke="#2D5A45" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <ellipse cx="80" cy="126" rx={eyesWide ? 8 : 7} ry={eyesWide ? 11 : 9} fill="#2D5A45" />
            <ellipse cx="140" cy="126" rx={eyesWide ? 8 : 7} ry={eyesWide ? 11 : 9} fill="#2D5A45" />
            <circle cx="82" cy="123" r="2.4" fill="#fff" />
            <circle cx="142" cy="123" r="2.4" fill="#fff" />
            {eyesWide && (
              <g fill="#EF9F27">
                <path d="M64 116 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 z" />
                <path d="M158 116 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 z" />
              </g>
            )}
          </>
        )}

        {/* mouth */}
        {mouthBig ? (
          <path d="M96 160 Q110 176 124 160 Q118 168 110 168 Q102 168 96 160 Z" fill="#E8836B" />
        ) : mouthYawn ? (
          <ellipse cx="110" cy="162" rx="5" ry="7" fill="#E8836B" opacity="0.85" />
        ) : mouthO ? (
          <circle cx="110" cy="162" r="5" fill="#E8836B" />
        ) : (
          <path d="M102 160 Q110 167 118 160" stroke="#E8836B" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        )}

        {/* arms */}
        <ellipse cx="36" cy="160" rx="13" ry="17" fill="#8AD4B0" transform={`rotate(${mood === "glowing" ? -40 : -18} 36 160)`} />
        <ellipse cx="184" cy="160" rx="13" ry="17" fill="#8AD4B0" transform={`rotate(${mood === "glowing" ? 40 : 18} 184 160)`} />

        {/* feet */}
        <ellipse cx="84" cy="218" rx="15" ry="8" fill="#6dbf95" />
        <ellipse cx="136" cy="218" rx="15" ry="8" fill="#6dbf95" />

        {/* Accessories */}
        {accessory === "glasses" && (
          <g stroke="#2D5A45" strokeWidth="2.8" fill="none">
            <circle cx="80" cy="126" r="13" fill="#fff" fillOpacity="0.3" />
            <circle cx="140" cy="126" r="13" fill="#fff" fillOpacity="0.3" />
            <line x1="93" y1="126" x2="127" y2="126" />
          </g>
        )}
        {accessory === "tophat" && (
          <g>
            <rect x="76" y="42" width="68" height="38" rx="3" fill="#2D5A45" />
            <rect x="64" y="78" width="92" height="8" rx="2" fill="#2D5A45" />
            <rect x="76" y="64" width="68" height="6" fill="#EF9F27" />
          </g>
        )}
        {accessory === "wizardhat" && (
          <g>
            <path d="M70 86 L110 8 L150 86 Z" fill="#7F77DD" />
            <circle cx="110" cy="40" r="3" fill="#F4C542" />
            <circle cx="98" cy="60" r="2" fill="#F4C542" />
            <circle cx="124" cy="55" r="2" fill="#F4C542" />
          </g>
        )}
        {accessory === "crown" && (
          <g fill="#F4C542" stroke="#D9A82E" strokeWidth="1.5">
            <path d="M70 80 L78 56 L92 72 L110 50 L128 72 L142 56 L150 80 Z" />
            <circle cx="110" cy="62" r="3" fill="#E8836B" />
          </g>
        )}
        {accessory === "bowtie" && (
          <g fill="#E8836B">
            <path d="M82 192 L102 184 L102 204 Z" />
            <path d="M138 192 L118 184 L118 204 Z" />
            <rect x="102" y="186" width="16" height="14" rx="2" />
          </g>
        )}
        {accessory === "scarf" && (
          <g fill="#7AB8D9">
            <path d="M70 188 Q110 200 150 188 L150 198 Q110 210 70 198 Z" />
            <path d="M140 198 L148 220 L154 218 L146 196 Z" />
          </g>
        )}
      </g>

      {/* mood-floating elements */}
      {mood === "glowing" && (
        <g className="animate-twinkle">
          <path d="M30 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" fill="#EF9F27" />
          <path d="M194 70 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" fill="#F4C542" />
          <path d="M180 30 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 z" fill="#E8836B" />
        </g>
      )}
      {mood === "night" && (
        <g>
          <text x="160" y="50" fontSize="14" fill="#7F77DD" fontWeight="800">z</text>
          <text x="172" y="38" fontSize="11" fill="#7F77DD" fontWeight="800">z</text>
        </g>
      )}
      {mood === "subdued" && (
        <text x="170" y="60" fontSize="14" fill="#5BAF85" opacity="0.6">💭</text>
      )}
    </svg>
  );
};

export default LivingOlee;
