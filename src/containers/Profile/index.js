import "./style.css";

import React, { useContext } from "react";

import UpdatePasswordForm from "../../components/UpdatePasswordForm";
import { UserContext } from "../../context/AppContext";

export default function UpdatePassword() {
	const { state, setState } = useContext(UserContext);

	return (
		<div className="updatepassword-wrapper">
			<UpdatePasswordForm></UpdatePasswordForm>
		</div>
	);
}
