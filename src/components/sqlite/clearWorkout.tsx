import { db } from ".";
import { createTable } from "./createWorkoutTable";

export const clearDatabase = async () => {
  try {
    await (
      await db
    ).execAsync(`
        DROP TABLE IF EXISTS workouts;
        DROP TABLE IF EXISTS exercises;
      `);
    createTable();
    // console.log("Database cleared successfully.");
  } catch (error) {
    // console.error("Error clearing database:", error);
  }
};
