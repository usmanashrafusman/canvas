import CanvasStage from "@/components/CanvasStage";
import Toolbar from "@/components/Toolbar";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b border-neutral-800 p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Real-time Canvas</h1>
        <Toolbar />
      </header>
      <section className="flex-1">
        <CanvasStage />
      </section>
      <footer className="p-3 text-center text-xs text-neutral-400 border-t border-neutral-800">
        Open another tabs to see real-time sync.
      </footer>
    </main>
  );
}
