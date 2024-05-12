import { create } from "zustand";

interface StoreState {
  workoutStore: any;
  clearWorkoutStore: () => void;
  setWorkoutStore: (as: any) => void;
}

const useStore = create<StoreState>((set) => ({
  workoutStore: [],
  clearWorkoutStore: () => set(() => ({ workoutStore: [] })),
  setWorkoutStore: (as: any) => set(() => ({ workoutStore: as })),
}));

export default useStore;
