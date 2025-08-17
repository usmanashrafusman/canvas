"use client";

import { getSocket } from "@/lib/socket";

export default function Toolbar() {
  const handleAdd = () => {
    const socket = getSocket();
    socket.emit("rectangle:add");
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleAdd}
        className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow"
      >
        Add Rectangle
      </button>
    </div>
  );
}
