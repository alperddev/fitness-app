import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import type { SheetProps } from "@tamagui/sheet";
import { Sheet } from "@tamagui/sheet";
import { useState } from "react";
import { Button, H2, Input, Paragraph, XStack, YStack } from "tamagui";
import useStore from "./Store";
import ExerciseList from "./ExerciseList";
import SelectedExercises from "./SelectedExercises";

export default function Modal() {
  const [innerOpen, setInnerOpen] = useState(false);
  const modal = useStore((state) => state.modal);
  const setModal = useStore((state) => state.setModal);

  const snapPoints = [90];

  function InnerSheet(props: SheetProps) {
    return (
      <Sheet
        animation="bouncy"
        modal
        snapPoints={[90]}
        dismissOnSnapToBottom
        {...props}
      >
        <Sheet.Overlay
          animation="bouncy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Sheet.Handle />

        <Sheet.Frame
          flex={1}
          justifyContent="center"
          alignItems="center"
          space="$5"
        >
          <Sheet.ScrollView>
            <YStack p="$5" gap="$8">
              <Button
                size="$6"
                circular
                alignSelf="center"
                icon={ChevronDown}
                onPress={() => props.onOpenChange?.(false)}
              />

              <H2>Hello world</H2>

              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Paragraph key={i} size="$8">
                  Eu officia sunt ipsum nisi dolore labore est laborum laborum
                  in esse ad pariatur. Dolor excepteur esse deserunt voluptate
                  labore ea. Exercitation ipsum deserunt occaecat cupidatat
                  consequat est adipisicing velit cupidatat ullamco veniam
                  aliquip reprehenderit officia. Officia labore culpa ullamco
                  velit. In sit occaecat velit ipsum fugiat esse aliqua dolor
                  sint.
                </Paragraph>
              ))}
            </YStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    );
  }

  return (
    <>
      <Sheet
        forceRemoveScrollEnabled={modal}
        modal={true}
        open={modal}
        onOpenChange={setModal}
        snapPoints={snapPoints}
        dismissOnSnapToBottom
        zIndex={100_000}
        animation="bouncy"
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Sheet.Handle />

        <Sheet.Frame
          padding="$4"
          justifyContent="center"
          alignItems="center"
          space="$5"
        >
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => setModal(false)}
          />
          <XStack flex={1}>
            <YStack flex={1} bg={"$background"}>
              <ExerciseList />
              <SelectedExercises />
              <InnerSheet open={innerOpen} onOpenChange={setInnerOpen} />
            </YStack>
          </XStack>
          <Button
            size="$6"
            circular
            icon={ChevronUp}
            onPress={() => setInnerOpen(true)}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
