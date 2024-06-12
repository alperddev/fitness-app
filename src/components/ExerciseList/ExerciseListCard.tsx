import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";

const ExerciseListCard = ({ item, handlePress }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        handlePress(item);
        setIsActive(!isActive);
      }}
      style={{
        borderRadius: 10,
        backgroundColor: isActive ? "green" : "black",
        borderWidth: 1,
        padding: 10,
        margin: 5,
      }}
    >
      <Text
        style={{
          color: "white",
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};
export default ExerciseListCard;
