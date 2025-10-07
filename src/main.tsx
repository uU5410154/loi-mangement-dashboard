
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import AppDemo from "./App.demo.tsx";
  import "./index.css";

  // Set to true to see the new customizable dashboard demo
  // Set to false to see the original dashboard
  const USE_DEMO = true;

  createRoot(document.getElementById("root")!).render(USE_DEMO ? <AppDemo /> : <App />);
