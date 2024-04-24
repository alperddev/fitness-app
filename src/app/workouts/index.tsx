import React from "react";
import { Button, Text, YStack } from "tamagui";
import Modal from "../../components/Modal";
import useStore from "../../providers/Store";

export default function App() {
  const { setModal } = useStore();

  return (
    <YStack>
      <Text>workout</Text>
      <Button onPress={() => setModal(true)}>Open</Button>
      <Modal />
    </YStack>
  );
}
