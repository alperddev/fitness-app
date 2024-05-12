import { db } from "@/src/app/(tabs)";

const removeWorkout = async (workoutId) => {
  try {
    await (await db).runAsync("DELETE FROM workouts WHERE id = ?", [workoutId]);
    // console.log("Workout deleted successfully.");
  } catch (error) {
    // console.error("Error deleting workout:", error);
  }
};

export default removeWorkout;
