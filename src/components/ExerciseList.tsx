import React, { useState } from "react";
import { Card, Text, YStack } from "tamagui";
import { Data } from "../providers/Data";
import useStore from "../providers/Store";
import { FlatList } from "react-native";

export default function ExerciseList() {
  const [selected, setSelected] = useState([]);
  const handlePress = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };
  // const { addExercise, selectedExercises, removeExercise } = useStore();
  // const handlePress = (item) => {
  //   if (selectedExercises.includes(item)) {
  //     removeExercise(item);
  //   } else {
  //     addExercise(item);
  //   }
  // };
  const ExerciseListCard = ({ item }) => {
    return (
      <Card
        pressStyle={{ bg: "$green9" }}
        bg={selected.includes(item) ? "$green9" : "$backgroundHover"}
        onPress={() => {
          handlePress(item);
        }}
        key={item.id}
        borderRadius={10}
        alignItems="center"
        margin={"$2.5"}
      >
        <Text margin={"$2.5"}>{item.name}</Text>
      </Card>
    );
  };

  return (
    <YStack>
      <FlatList
        data={Data}
        renderItem={({ item }) => <ExerciseListCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </YStack>
  );
}
