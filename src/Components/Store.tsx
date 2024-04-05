import { create } from "zustand";
import * as SQLite from "expo-sqlite";
export const db = SQLite.openDatabase("exercises.db");

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
  modal: boolean;
  setModal: (as: boolean) => void;
  loopLength: number[];
  setLoopLength: (as: number[]) => void;
}
const useStore = create<StoreState>((set, get) => ({
  selectedExercises: [],
  modal: false,
  loopLength: [7],
  setLoopLength: (as: number[]) => set(() => ({ loopLength: as })),
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
      set({ selectedExercises: [] });
    } catch (error) {
      console.error("Error in clearDatabase:", error);
    }
  },
  setModal: (as: boolean) => set(() => ({ modal: as })),
}));

export default useStore;
