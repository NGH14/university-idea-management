import './App.css';
import './reset.css';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';

import ToastifyProvider from 'components/ToastProvider';
import { AppContext } from 'context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import { ListRoute } from 'routes';

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
