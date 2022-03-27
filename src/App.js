import "./App.css";
import "./reset.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from "react-router-dom";

import ToastifyProvider from "./components/ToastProvider";
import { AppContext } from "./context/AppContext";
import { ListRoute } from "./routes";

function App() {
	return (
		<AppContext>
			<BrowserRouter>
				<ToastifyProvider />
				<ListRoute />
			</BrowserRouter>
		</AppContext>
	);
}

export default App;
