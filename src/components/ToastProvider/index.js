import { ToastContainer, Bounce } from "react-toastify";
import "./style.css"
export default function ToastifyProvider() {
	return (
		<ToastContainer
		
			transition={Bounce}
			theme="colored"
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={true}
			closeOnClick={true}
			rtl={false}
			pauseOnHover={true}
			pauseOnFocusLoss={false}
			draggable={true}
			draggablePercent={20}
		/>
	);
}
