import React, { useState } from "react";
import { YStack, Text, Input, Button, Slider } from "tamagui";
import useStore from "../providers/Store";
import { FlatList } from "react-native";
export default function CreateWorkout() {
  const { addWorkout, selectedExercises, removeExercise, workouts } =
    useStore();
  const [workoutName, setWorkoutName] = useState("");
  const [loopLength, setLoopLength] = useState([7]);
  const handleAddWorkout = () => {
    addWorkout({
      id: Date.now().toString(),
      name: workoutName,
      exercises: [],
      loopLength: loopLength[0],
    });
  };
  return (
    <YStack flex={1}>
      <Text>Create Workout</Text>
      <Input
        value={workoutName}
        onChangeText={setWorkoutName}
        placeholder="Workout Name"
      />
      <Slider
        marginVertical="$10"
        value={loopLength}
        onValueChange={(value: number[]) => setLoopLength(value)}
        size="$4"
        width={200}
        defaultValue={[7]}
        max={100}
        step={1}
      >
        <Slider.Track>
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb circular index={0} />
      </Slider>
      <Button onPress={handleAddWorkout}>Add Workout</Button>
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <Text>
            {item.name}, {item.loopLength}
          </Text>
        )}
      />
    </YStack>
  );
}
