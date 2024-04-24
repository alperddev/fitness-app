import { create } from "zustand";
interface Exercise {
  id: string;
  name: string;
  counter: number;
}
interface StoreState {
  selectedExercises: Exercise[];
  modal: boolean;
  setModal: (as: boolean) => void;
  loopLength: number[];
  setLoopLength: (as: number[]) => void;
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exercise: Exercise) => void;
}
const useStore = create<StoreState>((set) => ({
  selectedExercises: [],
  modal: false,
  loopLength: [7],
  setLoopLength: (as: number[]) => set(() => ({ loopLength: as })),
  setModal: (as: boolean) => set(() => ({ modal: as })),
  addExercise: (exercise: Exercise) =>
    set((state) => ({
      selectedExercises: [...state.selectedExercises, exercise],
    })),
  removeExercise: (as: Exercise) =>
    set((state) => ({
      selectedExercises: state.selectedExercises.filter((e) => e.id !== as.id),
    })),
}));

export default useStore;
