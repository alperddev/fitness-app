import { db } from "@/src/app/(tabs)";

const fetchWorkout = async () => {
  try {
    const workouts: {
      id: number;
      name: string;
      sets: number;
      reps: number;
      weight: number;
      exercises: any[];
    }[] = await (await db).getAllAsync("SELECT * FROM workouts");

    for (let i = 0; i < workouts.length; i++) {
      const exercises = await (
        await db
      ).getAllAsync("SELECT * FROM exercises WHERE workout_id = ?", [
        workouts[i].id,
      ]);
      workouts[i].exercises = exercises;
    }

    return workouts;
    // console.log("Saved workouts fetched successfully.");
  } catch (error) {
    // console.error("Error fetching saved workouts:", error);
  }
};
export default fetchWorkout;
