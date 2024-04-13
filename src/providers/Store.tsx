import { create } from "zustand";

interface StoreState {
  modal: boolean;
  setModal: (as: boolean) => void;
  loopLength: number[];
  setLoopLength: (as: number[]) => void;
}
const useStore = create<StoreState>((set) => ({
  modal: false,
  loopLength: [7],
  setLoopLength: (as: number[]) => set(() => ({ loopLength: as })),

  setModal: (as: boolean) => set(() => ({ modal: as })),
}));

export default useStore;
