import { Easing, interpolate, useCurrentFrame } from "remotion";

export type GradientVariant = "redOrange" | "green" | "pinkPurple" | "blue";

const GRADIENTS: Record<GradientVariant, string> = {
  redOrange:
    "radial-gradient(ellipse 60% 50% at 50% 15%, rgba(20,0,0,0.85), transparent 60%), linear-gradient(160deg, #ff6a3d 0%, #e8291c 55%, #c41e0f 100%)",
  green:
    "radial-gradient(ellipse 55% 60% at 50% 55%, rgba(120,255,170,0.9), transparent 65%), linear-gradient(160deg, #0b3d20 0%, #06301a 100%)",
  pinkPurple:
    "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(10,0,20,0.9), transparent 60%), linear-gradient(160deg, #ff6fd8 0%, #c13cff 50%, #7a1fcf 100%)",
  blue:
    "radial-gradient(ellipse 70% 18% at 50% 55%, rgba(140,190,255,0.95), transparent 70%), linear-gradient(160deg, #0a1a4a 0%, #050d2c 100%)",
};

type Props = {
  title: string;
  variant: GradientVariant;
  startFrame: number;
  durationInFrames: number;
  size: number;
};

export const GradientBox: React.FC<Props> = ({
  title,
  variant,
  startFrame,
  durationInFrames,
  size,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const eased = interpolate(localFrame, [0, durationInFrames], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = eased;
  const translateY = interpolate(eased, [0, 1], [56, 0]);
  const blurPx = interpolate(eased, [0, 1], [24, 0]);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: GRADIENTS[variant],
        opacity,
        transform: `translateY(${translateY}px)`,
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
