import "./reset.css";
import "./App.css";

import { BrowserRouter, Routes } from "react-router-dom";
import { listRoute } from "./routes";
import {AppContext} from "./context/AppContext";

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        {/* <Header /> */}

        <Routes>{listRoute()}</Routes>

        {/* <Backtop />
        <Footer /> */}
      </BrowserRouter>
    </AppContext>
  );
}

export default App;
