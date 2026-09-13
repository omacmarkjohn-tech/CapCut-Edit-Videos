import { Easing, interpolate, useCurrentFrame } from "remotion";

export type GradientVariant = "redOrange" | "green" | "pinkPurple" | "blue";

type GradientSpec = {
  ellipseSize: string;
  baseX: number;
  baseY: number;
  glowColor: string;
  fadeStop: string;
  linear: string;
};

const GRADIENT_SPECS: Record<GradientVariant, GradientSpec> = {
  redOrange: {
    ellipseSize: "60% 50%",
    baseX: 50,
    baseY: 15,
    glowColor: "rgba(20,0,0,0.85)",
    fadeStop: "60%",
    linear: "linear-gradient(160deg, #ff6a3d 0%, #e8291c 55%, #c41e0f 100%)",
  },
  green: {
    ellipseSize: "55% 60%",
    baseX: 50,
    baseY: 55,
    glowColor: "rgba(120,255,170,0.9)",
    fadeStop: "65%",
    linear: "linear-gradient(160deg, #0b3d20 0%, #06301a 100%)",
  },
  pinkPurple: {
    ellipseSize: "50% 45%",
    baseX: 50,
    baseY: 50,
    glowColor: "rgba(10,0,20,0.9)",
    fadeStop: "60%",
    linear: "linear-gradient(160deg, #ff6fd8 0%, #c13cff 50%, #7a1fcf 100%)",
  },
  blue: {
    ellipseSize: "70% 18%",
    baseX: 50,
    baseY: 55,
    glowColor: "rgba(140,190,255,0.95)",
    fadeStop: "70%",
    linear: "linear-gradient(160deg, #0a1a4a 0%, #050d2c 100%)",
  },
};

const buildBackground = (
  variant: GradientVariant,
  driftX: number,
  driftY: number,
) => {
  const spec = GRADIENT_SPECS[variant];
  const x = spec.baseX + driftX;
  const y = spec.baseY + driftY;
  return `radial-gradient(ellipse ${spec.ellipseSize} at ${x}% ${y}%, ${spec.glowColor}, transparent ${spec.fadeStop}), ${spec.linear}`;
};

type Props = {
  title: string;
  variant: GradientVariant;
  startFrame: number;
  durationInFrames: number;
  size: number;
  idlePhase: number;
};

export const GradientBox: React.FC<Props> = ({
  title,
  variant,
  startFrame,
  durationInFrames,
  size,
  idlePhase,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const eased = interpolate(localFrame, [0, durationInFrames], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = eased;
  const entranceY = interpolate(eased, [0, 1], [56, 0]);
  const blurPx = interpolate(eased, [0, 1], [24, 0]);

  // Gentle idle motion once the entrance has (mostly) settled, offset per box
  // so the 4 boxes never move in perfect unison.
  const floatPeriod = 150 + idlePhase * 14;
  const floatAngle = ((frame + idlePhase * 37) / floatPeriod) * Math.PI * 2;
  const floatY = Math.sin(floatAngle) * 9 * eased;

  const glowPeriod = 210 + idlePhase * 21;
  const glowAngle = ((frame + idlePhase * 53) / glowPeriod) * Math.PI * 2;
  const driftX = Math.sin(glowAngle) * 7;
  const driftY = Math.cos(glowAngle * 0.8) * 6;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: buildBackground(variant, driftX, driftY),
        opacity,
        transform: `translateY(${entranceY + floatY}px)`,
        filter: `blur(${blurPx}px)`,
        boxShadow:
          "inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -20px 40px rgba(0,0,0,0.25), 0 20px 40px rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <span
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
          fontSize: size * 0.1,
          fontWeight: 600,
          color: "#ffffff",
          letterSpacing: "-0.01em",
          textShadow: "0 2px 12px rgba(0,0,0,0.35)",
          textAlign: "center",
          padding: "0 12%",
        }}
      >
        {title}
      </span>
    </div>
  );
};
