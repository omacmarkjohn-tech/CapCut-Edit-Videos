import { AbsoluteFill } from "remotion";
import { GradientBox, GradientVariant } from "./components/GradientBox";

const BOX_SIZE = 360;
const BOX_GAP = 60;
const BOX_DURATION = 60; // 2 seconds at 30fps
const STAGGER = 10; // frames between each box's animation start

const BOXES: { title: string; variant: GradientVariant }[] = [
  { title: "Workouts", variant: "redOrange" },
  { title: "Nutrition", variant: "green" },
  { title: "Progress", variant: "pinkPurple" },
  { title: "Coaching", variant: "blue" },
];

export const BoxesScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: BOX_GAP,
      }}
    >
      {BOXES.map((box, index) => (
        <GradientBox
          key={box.title}
          title={box.title}
          variant={box.variant}
          startFrame={index * STAGGER}
          durationInFrames={BOX_DURATION}
          size={BOX_SIZE}
          idlePhase={index}
        />
      ))}
    </AbsoluteFill>
  );
};
