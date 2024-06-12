import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";

const ExerciseListCard = ({
  item,
  handleSetsChange,
  handleRepsChange,
  handleWeightChange,
}) => {
  const [sets, setSets] = useState(item.sets);
  const [reps, setReps] = useState(item.reps);
  const [weight, setWeight] = useState(item.weight);

  const handleSets = () => {
    handleSetsChange(sets, item.id);
  };
  const handleReps = () => {
    handleRepsChange(reps, item.id);
  };

  const handleWeight = () => {
    handleWeightChange(weight, item.id);
  };

  const SetsListCard = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{
            color: "white",
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginVertical: 10,
            width: "50%",
          }}
          placeholderTextColor="white"
          keyboardType="numeric"
          placeholder="Reps"
          value={reps}
          onChangeText={(text) => setReps(text)}
          onEndEditing={handleReps}
        />

        <TextInput
          style={{
            color: "white",
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            width: "50%",
            marginVertical: 10,
          }}
          placeholderTextColor="white"
          keyboardType="numeric"
          placeholder="Weight"
          value={weight}
          onChangeText={(text) => setWeight(text)}
          onEndEditing={handleWeight}
        />
      </View>
    );
  };
  return (
    <View
      style={{
        borderRadius: 10,
        padding: 10,
        alignSelf: "center",
        width: "100%",
      }}
    >
      <Text style={{ color: "white" }}>
        {item.name} Sets: {item.sets} Reps: {item.reps} Weight: {item.weight}
      </Text>
      <SetsListCard />
    </View>
  );
};

export default ExerciseListCard;
