import "./App.css";

import { BrowserRouter, Routes } from "react-router-dom";
import { listRoute } from "./routes";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}

        <Routes>{listRoute()}</Routes>

        {/* <Backtop />
        <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
