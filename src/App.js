import "./App.css";
import "./reset.css";

import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";

import { AppContext } from "./context/AppContext";
import { ListRoute } from "./routes";

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
