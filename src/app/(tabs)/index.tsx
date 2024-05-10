import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import * as SQLite from "expo-sqlite";
export const db = SQLite.openDatabaseAsync("workouts.db");

export default function App() {
  const createTable = async () => {
    await (
      await db
    ).execAsync(`
      create table if not exists workouts
      (id integer primary key autoincrement,
      name text);
      `);

    await (
      await db
    ).execAsync(`
    create table if not exists exercises (
      id integer primary key autoincrement,
      workout_id integer not null,
      name text,
      sets integer,
      reps integer,
      weight integer,
      weight_increase integer,
      looplength integer,
      foreign key(workout_id) references workouts(id) on delete cascade );
      `);
  };
  useEffect(() => {
    createTable();
  }, []);

  const clearDatabase = async () => {
    try {
      await (
        await db
      ).execAsync(`
        DROP TABLE IF EXISTS workouts;
        DROP TABLE IF EXISTS exercises;
      `);
      createTable();
      // console.log("Database cleared successfully.");
    } catch (error) {
      // console.error("Error clearing database:", error);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>First Page</Text>
      <Button
        title="Create Table"
        onPress={() => {
          createTable();
        }}
      />
      <Button
        title="Clear Database"
        onPress={() => {
          clearDatabase();
        }}
      />
    </View>
  );
}
