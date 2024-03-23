import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from ".";
import useStore from "@/src/Components/Store";
import { Button } from "tamagui";

const ExercisesScreen = () => {
  const clearDatabase = useStore((state) => state.clearDatabase);
  const [exercises, setExercises] = useState([]);
  const fetchExercises = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM exercises;",
        [],
        (_, { rows: { _array } }) => {
          setExercises(_array);
        }
      );
    });
  };

  useEffect(() => {
    fetchExercises();
  }, []);
  const handleClear = () => {
    clearDatabase();
    setExercises([]);
  };
  const handleLoad = () => {
    fetchExercises();
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseDescription}>{item.description}</Text>
            <Text style={styles.exerciseCategory}>
              Category: {item.category}
            </Text>
          </View>
        )}
      />
      <Button onPress={handleLoad}>load</Button>
      <Button onPress={handleClear}>delete</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  exerciseContainer: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  exerciseCategory: {
    fontSize: 14,
    color: "#666",
  },
});

export default ExercisesScreen;
