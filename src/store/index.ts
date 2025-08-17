import { create } from "zustand";
import { createRectangleSlice, RectangleSlice } from "./rectangleSlice";

export type Store = {
  rectangle: RectangleSlice;
};

export const useStore = create<Store>()((...a) => ({
  ...createRectangleSlice(...a),
}));
