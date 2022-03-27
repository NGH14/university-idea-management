import { ToastContainer } from "react-toastify";

export default function ToastifyProvider() {
	return (
		<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar={true}
			newestOnTop={true}
			closeOnClick={true}
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	);
}
