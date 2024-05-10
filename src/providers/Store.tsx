import { create } from "zustand";

interface StoreState {
  workoutStore: any;
  setWorkoutStore: (as: any) => void;
  modal: boolean;
  setModal: (as: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  workoutStore: [],
  setWorkoutStore: (as: any) => set(() => ({ workoutStore: as })),
  modal: false,
  setModal: (as: boolean) => set(() => ({ modal: as })),
}));

export default useStore;
