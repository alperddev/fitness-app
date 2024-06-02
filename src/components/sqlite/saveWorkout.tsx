import { db } from ".";

const saveWorkout = async (workoutStore, exercises) => {
  try {
    const workoutInsertResult = await (
      await db
    ).runAsync("INSERT INTO workouts (name) VALUES (?)", workoutStore.name);
    const workoutId = workoutInsertResult.lastInsertRowId;

    for (const exercise of exercises) {
      const exerciseInsertResult = await (
        await db
      ).runAsync("INSERT INTO exercises (workout_id, name) VALUES (?, ?)", [
        workoutId,
        exercise.name,
      ]);
      const exerciseId = exerciseInsertResult.lastInsertRowId;

      for (const set of exercise.sets) {
        await (
          await db
        ).runAsync(
          "INSERT INTO sets (exercise_id, reps, weight) VALUES (?, ?, ?)",
          [exerciseId, set.reps, set.weight]
        );
      }
    }
  } catch (error) {
    console.error("Error saving to SQLite:", error);
  }
};
export default saveWorkout;
