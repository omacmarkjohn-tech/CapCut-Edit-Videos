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
  const { durationInFrames, width, height, fps } = useVideoConfig();
  const t = frame / fps;

  // Slow continuous zoom-in across the whole clip.
  const zoomTrend = interpolate(frame, [0, durationInFrames], [1.18, 1.34], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Organic breathing pulse layered on top of the zoom trend.
  const breathing = Math.sin((t / 4.2) * Math.PI * 2) * 0.02;
  const scale = zoomTrend + breathing;

  // Slow drifting pan with different periods per axis for a non-repeating,
  // Lissajous-like float instead of a straight line.
  const panX = Math.sin((t / 6.5) * Math.PI * 2) * 5.5; // % of box width
  const panY = Math.cos((t / 8.3) * Math.PI * 2) * 4.5; // % of box height

  // Subtle rotational wobble for extra life.
  const wobble = Math.sin((t / 9) * Math.PI * 2) * 1.6; // degrees

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
            transform: `translate(${panX}%, ${panY}%) rotate(${wobble}deg) scale(${scale})`,
            transformOrigin: "center center",
          }}
        />
      </div>

      <GrainOverlay frame={frame} opacity={0.07} />
    </AbsoluteFill>
  );
};
