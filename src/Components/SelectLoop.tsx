import React from "react";
import useStore from "../providers/Store";
import { Card, Slider, Text, YStack } from "tamagui";

export default function Loop() {
  const setLoopLength = useStore((state) => state.setLoopLength);
  const loopLength = useStore((state) => state.loopLength);

  return (
    <YStack flex={1}>
      <Card
        width={"$4.5"}
        alignSelf="center"
        margin={"$2.5"}
        bg={"$backgroundHover"}
        alignItems="center"
      >
        <Text margin={"$2.5"}>{loopLength}</Text>
      </Card>
      <Slider
        value={loopLength}
        onValueChange={(value: number[]) => setLoopLength(value)}
        defaultValue={[7]}
        max={30}
        step={1}
        marginVertical={"$8"}
        marginHorizontal={"$5"}
        min={1}
      >
        <Slider.Track>
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb circular index={0} />
      </Slider>
    </YStack>
  );
}
