import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import * as SQLite from "expo-sqlite";
export const db = SQLite.openDatabase("workouts.db");

export default function App() {
  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists workouts (id integer primary key autoincrement , name text);"
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists exercises (id integer primary key autoincrement , workout_id integer not null , name text,looplength integer, foreign key(workout_id) references workouts(id) on delete cascade );"
      );
    });
  };
  useEffect(() => {
    createTable();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>First Page</Text>
      <Button title="Create Table" onPress={() => {}} />
    </View>
  );
}
