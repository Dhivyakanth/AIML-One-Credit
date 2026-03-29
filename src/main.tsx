import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initWebVitals } from "./lib/performance";

createRoot(document.getElementById("root")!).render(<App />);

void initWebVitals();
