import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./theme.css";
import App from "./App.jsx";
import Support from "./pages/Support.jsx";

const path = window.location.pathname.replace(/\/+$/, "");
const isSupport = path === "/support";

createRoot(document.getElementById("root")).render(
  <StrictMode>{isSupport ? <Support /> : <App />}</StrictMode>,
);
