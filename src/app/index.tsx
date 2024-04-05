import React, { useEffect } from "react";
import { Button, YStack } from "tamagui";
import useStore, { db } from "../Components/Store";
import Modal from "../Components/Modal";
import Loop from "../Components/SelectLoop";
export default function App() {
  const setModal = useStore((state) => state.setModal);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS exercises (id TEXT PRIMARY KEY NOT NULL, name TEXT)"
      );
    });
  }, []);

  return (
    <YStack bg={"$background"} flex={1}>
      <Button onPress={() => setModal(true)}>Open</Button>
      <Modal />
      <Loop />
    </YStack>
  );
}
