import { Analytics } from "@vercel/analytics/react";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <>
      <KanbanBoard />
      <Analytics />
    </>
  );
}

export default App;
