import { db } from "@/src/app/(tabs)";

const saveWorkout = async (workoutStore, exercises) => {
  try {
    const workoutInsertResult = await (
      await db
    ).runAsync("INSERT INTO workouts (name) VALUES (?)", workoutStore.name);
    const workoutId = workoutInsertResult.lastInsertRowId;

    for (const exercise of exercises) {
      await (
        await db
      ).runAsync(
        "INSERT INTO exercises (workout_id, name, sets, reps) VALUES (?, ? ,?, ?)",
        [workoutId, exercise.name, exercise.sets, exercise.reps]
      );
    }
  } catch (error) {
    console.error("Error saving to SQLite:", error);
  }
};
export default saveWorkout;
