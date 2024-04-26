import React from "react";
import { Button, Text, YStack } from "tamagui";
import Modal from "../../components/Modal";
import useStore from "../../providers/Store";
import CreateWorkout from "@/src/components/CreateWorkout";

export default function App() {
  const { setModal } = useStore();

  return (
    <YStack flex={1}>
      <Text>workout</Text>
      <CreateWorkout />
      <Button onPress={() => setModal(true)}>Open</Button>
      <Modal />
    </YStack>
  );
}
