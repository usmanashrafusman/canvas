"use client";
import { Stage, Layer, Rect } from "react-konva";
import { useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "@/lib/socket";
import { KonvaEventObject } from "konva/lib/Node";
import { useRectangles } from "@/hooks/useRectangles";
import { Rect as RectType } from "@/store/rectangleSlice";

export default function CanvasStage() {
  const { rects, setAll, add, move } = useRectangles();
  const [_, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 800, height: 500 });

  useEffect(() => {
    const handle = () => {
      const w = containerRef.current?.clientWidth ?? window.innerWidth;
      const h = containerRef.current?.clientHeight ?? window.innerHeight - 100;
      setSize({ width: w, height: h });
    };
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  useEffect(() => {
    const socket = getSocket();

    const onState = (all: any[]) => setAll(all);
    const onAdded = (rect: any) => add(rect);
    const onMoved = (rect: any) => move(rect.id, rect.x, rect.y);

    socket.on("connect", () => setReady(true));
    socket.on("rectangles:state", onState);
    socket.on("rectangle:added", onAdded);
    socket.on("rectangle:moved", onMoved);

    return () => {
      socket.off("rectangles:state", onState);
      socket.off("rectangle:added", onAdded);
      socket.off("rectangle:moved", onMoved);
    };
  }, [setAll, add, move]);

  const list = useMemo(() => Object.values(rects), [rects]);

  const onDragMove = (e: KonvaEventObject<DragEvent>, rect: RectType) => {
    const node = e.target;
    const nx = node.x();
    const ny = node.y();
    move(rect.id, nx, ny);
    getSocket().emit("rectangle:move", { id: rect.id, x: nx, y: ny });
  };

  return (
    <div ref={containerRef} className="w-full h-[calc(100vh-88px)]">
      <Stage width={size.width} height={size.height} className="bg-neutral-900">
        <Layer>
          {list.map((r) => (
            <Rect
              key={r.id}
              x={r.x}
              y={r.y}
              width={r.width}
              height={r.height}
              fill={r.fill}
              cornerRadius={8}
              draggable
              onDragMove={(e) => {
                onDragMove(e, r);
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
