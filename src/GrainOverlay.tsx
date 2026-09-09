import { AbsoluteFill, random } from "remotion";

export const GrainOverlay: React.FC<{ frame: number; opacity?: number }> = ({
  frame,
  opacity = 0.07,
}) => {
  const seed = Math.floor(random(`grain-${frame}`) * 100000);

  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay" }}>
      <svg width="100%" height="100%">
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            seed={seed}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix in="noise" type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>
    </AbsoluteFill>
  );
};
