import { create } from "zustand";
import { db } from "../app/SelectionStack";
interface Exercise {
  id: string;
  name: string;
  counter: number;
}

interface StoreState {
  selectedExercises: Exercise[];

  addExercise: (exercise: Exercise) => void;
  removeExercise: (exercise: Exercise) => void;
  clearAllExercises: () => void;
  saveExercises: () => void;
  clearDatabase: () => void;
}
const useStore = create<StoreState>((set, get) => ({
  selectedExercises: [],
  addExercise: (exercise) =>
    set((state) => {
      const existingExercise = state.selectedExercises.reduce((acc, ex) => {
        if (ex.id === exercise.id) {
          if (!acc || ex.counter > acc.counter) {
            return ex;
          }
        }
        return acc;
      }, null);

      if (!existingExercise) {
        return {
          selectedExercises: [
            ...state.selectedExercises,
            { ...exercise, counter: 1 },
          ],
        };
      } else {
        return {
          selectedExercises: [
            ...state.selectedExercises,
            { ...exercise, counter: existingExercise.counter + 1 },
          ],
        };
      }
    }),
  removeExercise: (exercise) =>
    set((state) => ({
      selectedExercises: state.selectedExercises.filter(
        (ex) => ex.id !== exercise.id || ex.counter !== exercise.counter
      ),
    })),

  clearAllExercises: () => set({ selectedExercises: [] }),
  saveExercises: async () => {
    try {
      const state = get();
      const exercises = state.selectedExercises;

      db.transaction((tx) => {
        for (const exercise of exercises) {
          console.log("Saving exercises:", exercise);
          tx.executeSql(
            "INSERT OR REPLACE INTO exercises (id, name) VALUES (?, ?)",
            [exercise.id + exercise.counter, exercise.name],
            () => console.log("Exercises saved!")
          );
        }
      });
    } catch (error) {
      console.error("Error in saveExercises:", error);
    }
  },

  clearDatabase: async () => {
    try {
      db.transaction((tx) => {
        tx.executeSql("DELETE FROM exercises");
      });
      // Reset the store's state
      set({ selectedExercises: [] });
    } catch (error) {
      console.error("Error in clearDatabase:", error);
    }
  },
}));

export default useStore;
