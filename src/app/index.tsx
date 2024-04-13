import React from "react";
import { Button, YStack } from "tamagui";
import useStore from "../providers/Store";
import Modal from "../components/Modal";
import Loop from "../components/SelectLoop";
import { router } from "expo-router";
import { Workout } from "../models/Exercise";
import { useRealm } from "@realm/react";

export default function App() {
  const setModal = useStore((state) => state.setModal);
  const realm = useRealm();

  const workouts = realm.objects(Workout);

  return (
    <YStack bg={"$background"} flex={1}>
      <Button onPress={() => setModal(true)}>Open</Button>
      <Modal />
      <Loop />
      <Button onPress={() => router.push("/two")} />
      <Button onPress={() => console.log(workouts)} />
    </YStack>
  );
}
