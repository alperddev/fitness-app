// import React from "react";
// import { YStack, Text } from "tamagui";
// import { useQuery, useRealm } from "@realm/react";
// import { Exercise } from "../models/Exercise";
// import { FlatList } from "react-native";

// const SavedExercises = () => {
//   const realm = useRealm();
//   const exercisesRealm = useQuery(Exercise);
//   const deleteTask = (item) => {
//     realm.write(() => {
//       realm.delete(item);
//     });
//   };
//   const displayWorkouts = () => {
//     const workouts = realm.objects(Workout);
//     return (
//       <FlatList
//         data={workouts}
//         renderItem={({ item }) => (
//           <Card
//             alignItems="center"
//             margin={"$2.5"}
//             bg={"$blue5"}
//             onPress={() => deleteExercise(item)}
//           >
//             <Text margin={"$2.5"}>{item.name}</Text>
//           </Card>
//         )}
//         keyExtractor={(item) => item._id}
//       />
//     );
//   }
//   return (
//     <YStack bg={"$background"} flex={1}>
//       <FlatList
//         data={exercisesRealm}
//         renderItem={({ item }) => (
//           <YStack>
//             <Text onPress={() => deleteTask(item)}>{item.name}</Text>
//           </YStack>
//         )}
//       />
//     </YStack>
//   );
// };

// export default SavedExercises;
import React from "react";
import { YStack, Text, Card } from "tamagui";
import { useQuery, useRealm } from "@realm/react";
import { Exercise, Workout } from "../models/Exercise";
import { FlatList } from "react-native";

const SavedExercises = () => {
  const realm = useRealm();
  const exercisesRealm = useQuery(Exercise);
  const workouts = realm.objects(Workout);

  const deleteExercise = (item) => {
    realm.write(() => {
      realm.delete(item);
    });
  };

  return (
    <YStack bg={"$background"} flex={1}>
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <Card
            alignItems="center"
            margin={"$2.5"}
            bg={"$blue5"}
            onPress={() => deleteExercise(item)}
          >
            <Text margin={"$2.5"}>{item.name}</Text>
            <FlatList
              data={item.exercises}
              renderItem={({ item }) => (
                <Text margin={"$2.5"}>{item.name}</Text>
              )}
            />
          </Card>
        )}
      />
    </YStack>
  );
};

export default SavedExercises;
