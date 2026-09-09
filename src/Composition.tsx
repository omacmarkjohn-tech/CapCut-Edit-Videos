import { Composition } from "remotion";
import { PremiumMotionBackground } from "./PremiumMotionBackground";

const FPS = 30;
const DURATION_IN_SECONDS = 10;

export const MyComposition = () => {
  return (
    <Composition
      id="PremiumMotionBackground"
      component={PremiumMotionBackground}
      durationInFrames={FPS * DURATION_IN_SECONDS}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
