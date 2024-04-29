import { create } from "zustand";

interface Exercise {
  id: string;
  name: string;
}

interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  loopLength: number;
}

interface StoreState {
  selectedExercises: Exercise[];
  workouts: Workout[];
  selectedWorkout: Workout | null;
  modal: boolean;
  loopLength: number;
  addWorkout: (workout: Workout) => void;
  removeWorkout: (workout: Workout) => void;
  setModal: (as: boolean) => void;
  setLoopLength: (as: number) => void;
  setSelectedWorkout: (workout: Workout | null) => void;
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exercise: Exercise) => void;
  setWorkouts: (workout: Workout) => void;
  setWorkout: (workout: Workout) => void;
}

const useStore = create<StoreState>((set, get) => ({
  workouts: [],
  selectedExercises: [],
  selectedWorkout: null,
  modal: false,
  loopLength: 7,
  setLoopLength: (as: number) => set(() => ({ loopLength: as })),
  setModal: (as: boolean) => set(() => ({ modal: as })),
  addExercise: (exercise: Exercise) =>
    set((state) => ({
      selectedExercises: [...state.selectedExercises, exercise],
    })),
  removeExercise: (as: Exercise) =>
    set((state) => ({
      selectedExercises: state.selectedExercises.filter((e) => e.id !== as.id),
    })),
  addWorkout: (workout: Workout) =>
    set((state) => ({ workouts: [...state.workouts, workout] })),
  removeWorkout: (workout: Workout) =>
    set((state) => ({
      workouts: state.workouts.filter((w) => w.id !== workout.id),
    })),

  setWorkouts: (workout: Workout) =>
    set((state) => ({
      workouts: state.workouts.map((w) => (w.id === workout.id ? workout : w)),
    })),
  setSelectedWorkout: (workout: Workout) =>
    set(() => ({ selectedWorkout: workout })),
  setWorkout: (workout: Workout) =>
    set((state) => ({
      workouts: state.workouts.map((w) => (w.id === workout.id ? workout : w)),
    })),
}));

export default useStore;
