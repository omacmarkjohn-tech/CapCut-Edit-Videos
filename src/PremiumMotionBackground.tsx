import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { GrainOverlay } from "./GrainOverlay";

export const PremiumMotionBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  // Slow, subtle Ken Burns zoom for a premium, cinematic feel.
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.06], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", overflow: "hidden" }}>
      {/* Pre-rotation box: swapped dimensions so a 90deg rotation exactly covers the 16:9 frame */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: height,
          height: width,
          transform: "translate(-50%, -50%) rotate(90deg)",
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("reference-source.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        />
      </div>

      <GrainOverlay frame={frame} opacity={0.07} />
    </AbsoluteFill>
  );
};
