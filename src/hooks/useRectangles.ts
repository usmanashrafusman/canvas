import { useStore } from "@/store";

export const useRectangles = () => {
  const { rectangle } = useStore();
  return rectangle
};
