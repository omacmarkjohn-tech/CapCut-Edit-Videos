import { Composition } from "remotion";
import { BoxesScene } from "./BoxesScene";

export const MyComposition = () => {
  return (
    <Composition
      id="AppleBoxes"
      component={BoxesScene}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
