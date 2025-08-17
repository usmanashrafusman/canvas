import type { StateCreator } from "zustand";
import type { Store } from "@/store";

export type Rect = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
};

export type RectangleSlice = {
  rects: Record<string, Rect>;
  setAll: (rects: Rect[]) => void;
  add: (rect: Rect) => void;
  move: (id: string, x: number, y: number) => void;
};

export const createRectangleSlice: StateCreator<
  Store,
  [],
  [],
  { rectangle: RectangleSlice }
> = (set) => ({
  rectangle: {
    rects: {},
    setAll: (rects) =>
      set((state) => ({
        rectangle: {
          ...state.rectangle,
          rects: Object.fromEntries(rects.map((r) => [r.id, r])),
        },
      })),
    add: (rect) =>
      set((state) => ({
        rectangle: {
          ...state.rectangle,
          rects: { ...state.rectangle.rects, [rect.id]: rect },
        },
      })),
    move: (id, x, y) =>
      set((state) => ({
        rectangle: {
          ...state.rectangle,
          rects: {
            ...state.rectangle.rects,
            [id]: { ...state.rectangle.rects[id], x, y },
          },
        },
      })),
  },
});
