import React, { useEffect } from "react";
import { Button, YStack } from "tamagui";
import { AArrowUp } from "@tamagui/lucide-icons";
import * as SQLite from "expo-sqlite";
import { router } from "expo-router";

export const db = SQLite.openDatabase("exercises.db");
export default function App() {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS exercises (id TEXT PRIMARY KEY NOT NULL, name TEXT)"
      );
    });
  }, []);

  return (
    <YStack bg={"$background"} flex={1}>
      <Button
        icon={<AArrowUp size={30} color={"white"} />}
        onPress={() => {
          router.push("/SelectionStack/selection");
        }}
      >
        selection page
      </Button>
      <Button
        icon={<AArrowUp size={30} color={"white"} />}
        onPress={() => {
          router.push("/SelectionStack/two");
        }}
      >
        selection page
      </Button>
    </YStack>
  );
}
