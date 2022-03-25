import { CircularProgress, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import _ from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";

import { AuthRequest } from "../../../common/AppUse";
import CreateUserForm from "../../../components/User/CreateUserForm";
import DetailUserForm from "../../../components/User/DetailUserForm";
import EditUserForm from "../../../components/User/EditUserForm";

const style = {
	position: "relative",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "1000px",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	borderRadius: "5px",
	overflow: "auto",
	maxHeight: "100%",
	" @media (max-width: 600px)": {
		width: "100%",
	},
};
const ModalUserManagement = (props) => {
	const { visible, onClose, onCreate, onUpdate, action, rowId } = props;
	const [initialValue, setInitialValue] = useState([]);
	useEffect(() => {
		if (action !== "create") {
			loadData();
		}
	}, [action]);
	const loadData = async () => {
		try {
			const res = await AuthRequest.get(`user-management/user/${rowId}`);
			if (res?.data?.succeeded) {
				setInitialValue(res?.data?.result);
			}
		} catch {}
	};
	const renderForm = () => {
		switch (action) {
			case "create":
				return <CreateUserForm onClose={() => onClose()} onCreate={onCreate} />;
			case "update":
				return (
					<EditUserForm
						onClose={() => onClose()}
						onUpdate={onUpdate}
						initialValue={initialValue}
					/>
				);
			case "detail":
				return (
					<DetailUserForm
						onClose={() => onClose()}
						initialValue={initialValue}
					/>
				);
		}
	};
	if (action !== "create" && _.isEmpty(initialValue)) {
		return <CircularProgress size={100} />;
	}
	return (
		<Modal
			open={visible}
			onClose={() => onClose()}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>{renderForm()}</Box>
		</Modal>
	);
};
export default React.memo(ModalUserManagement);
