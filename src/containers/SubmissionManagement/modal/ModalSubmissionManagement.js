import { CircularProgress, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import _ from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthRequest } from "../../../common/AppUse";
import { DEV_CONFIGS } from "../../../common/env";
import CreateSubmissionForm from "../../../components/Submission/CreateSubmissionForm";
import EditSubmissionForm from "../../../components/Submission/EditSubmissionForm";
import { dataDemo_submissions } from "../FakeData/Submissions";

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

const toastMessages = {
	ERR_SERVER_ERROR: "Something went wrong, please try again !!",
	ERR_USER_NOT_FOUND: "User not found !!",
};

const ModalSubmissionManagement = (props) => {
	const { visible, onClose, onCreate, onUpdate, action, rowId } = props;
	const [initialValue, setInitialValue] = useState([]);

	useEffect(() => {
		if (DEV_CONFIGS.IS_DEV) {
			let user = dataDemo_submissions.find((_) => _.id === rowId);
			if (!user) {
				toast.error(toastMessages.ERR_USER_NOT_FOUND);
				return;
			}
			setInitialValue(user);
			return;
		}

		if (action !== "create" && action !== "createIdea") {
			loadData();
		}
	}, [action]);

	const loadData = async () => {
		try {
			const res = await AuthRequest.get(`submission-management/${rowId}`);
			if (res?.data?.succeeded) {
				setInitialValue(res?.data?.result);
			}
		} catch {}
	};

	const renderForm = () => {
		switch (action) {
			case "create":
				return (
					<CreateSubmissionForm onClose={() => onClose()} onCreate={onCreate} />
				);
			case "update":
				return (
					<EditSubmissionForm
						onClose={() => onClose()}
						onUpdate={onUpdate}
						initialValue={initialValue}
					/>
				);
			// case "createIdea":
			// 	return <CreateSubmissionForm onClose={() => onClose()} />;
			default:
				return;
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
export default React.memo(ModalSubmissionManagement);
