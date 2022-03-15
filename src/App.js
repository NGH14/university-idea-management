import "./reset.css";
import "./App.css";
import { useContext } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import {ListRoute} from "./routes";

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <ListRoute />
      </BrowserRouter>
    </AppContext>
  );
}

export default App;
