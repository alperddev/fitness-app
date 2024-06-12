import createWorkoutTable from "./createWorkoutTable";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("workouts.db");

const clearWorkout = async () => {
  try {
    await (
      await db
    ).execAsync(`
        DROP TABLE IF EXISTS workouts;
        DROP TABLE IF EXISTS exercises;
      `);
    createWorkoutTable();
    // console.log("Database cleared successfully.");
  } catch (error) {
    // console.error("Error clearing database:", error);
  }
};
export default clearWorkout;
