import { create } from "zustand"
import * as SQLite from "expo-sqlite"

interface Exercise {
  id: string
  name: string
  counter: number
}

interface StoreState {
  selectedExercises: Exercise[]
  addExercise: (exercise: Exercise) => void
  removeExercise: (exercise: Exercise) => void
  clearAllExercises: () => void
  saveExercises: () => Promise<void>
}

const db = SQLite.openDatabase("exercises.db")

const useStore = create<StoreState>((set, get) => ({
  selectedExercises: [],
  addExercise: (exercise) =>
    set((state) => {
      const existingExercise = state.selectedExercises.reduce((acc, ex) => {
        if (ex.id === exercise.id) {
          if (!acc || ex.counter > acc.counter) {
            return ex
          }
        }
        return acc
      }, null)

      if (!existingExercise) {
        return {
          selectedExercises: [...state.selectedExercises, { ...exercise, counter: 1 }],
        }
      } else {
        return {
          selectedExercises: [
            ...state.selectedExercises,
            { ...exercise, counter: existingExercise.counter + 1 },
          ],
        }
      }
    }),
  removeExercise: (exercise) =>
    set((state) => ({
      selectedExercises: state.selectedExercises.filter(
        (ex) => ex.id !== exercise.id || ex.counter !== exercise.counter,
      ),
    })),

  clearAllExercises: () => set({ selectedExercises: [] }),

  saveExercises: async () => {
    const selectedExercises = get().selectedExercises

    await new Promise<void>((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS exercises (id TEXT PRIMARY KEY, name TEXT, counter INTEGER);",
            [],
            () => {
              for (const exercise of selectedExercises) {
                tx.executeSql(
                  "INSERT OR REPLACE INTO exercises (id, name, counter) VALUES (?, ?, ?);",
                  [exercise.id + exercise.counter, exercise.name, exercise.counter],
                  (_, result) => {
                    console.log("Exercise saved successfully")
                    set({ selectedExercises: [] })
                  },
                  (_, error) => {
                    console.error("Error saving exercise: ", error)
                    return true // Rollback the transaction
                  },
                )
              }
            },
            (_, error) => {
              console.error("Error creating table: ", error)
              return true // Rollback the transaction
            },
          )
        },
        (error) => {
          console.error("Transaction error: ", error)
          reject(error)
        },
        () => {
          console.log("Transaction completed successfully")
          resolve()
        },
      )
    })
  },
}))

export default useStore
