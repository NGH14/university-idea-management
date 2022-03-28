import { ToastContainer } from "react-toastify";

export default function ToastifyProvider() {
	return (
		<ToastContainer
			theme="dark"
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={true}
			closeOnClick={true}
			rtl={false}
			pauseOnHover={false}
			pauseOnFocusLoss={false}
		/>
	);
}
