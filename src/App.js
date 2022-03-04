import "./reset.css";
import "./App.css";
import { useContext } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { listRoute } from "./routes";
import { AppContext } from "./context/AppContext";

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <Routes>{listRoute()}</Routes>
      </BrowserRouter>
    </AppContext>
  );
}

export default App;
