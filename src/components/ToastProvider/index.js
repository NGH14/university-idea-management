import "./style.css";

import { Bounce, ToastContainer } from "react-toastify";

export default function ToastifyProvider() {
	return (
		<ToastContainer
			transition={Bounce}
			theme='colored'
			position='top-right'
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={true}
			closeOnClick={true}
			rtl={false}
			style={{ width: 'auto', minWidth: '20rem' }}
			pauseOnHover={true}
			pauseOnFocusLoss={false}
			draggable={true}
			draggablePercent={20}
		/>
	);
}
