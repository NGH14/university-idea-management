import { CircularProgress, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import _ from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";

import { AuthRequest } from "../../../common/AppUse";
import CreateUserForm from "../../../components/User/CreateUserForm";
import DetailUserForm from "../../../components/User/DetailUserForm";
import EditUserForm from "../../../components/User/EditUserForm";
import CreateForm from "../../../components/Submission/CreateForm";
import EditForm from "../../../components/Submission/EditForm";
import CreateIdexSubForm from "../../../components/Submission/CreateIdeaSubForm";
import CreateIdeaSubForm from "../../../components/Submission/CreateIdeaSubForm";

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
const ModalSubIdea = (props) => {
	const { visible, onClose, onCreate, onUpdate, action, initialValue } = props;
	const renderForm = () => {
		switch (action) {
			case "create":
				return <CreateIdeaSubForm onClose={() => onClose()}
										  onCreate={onCreate}
										  submissionTitle={initialValue?.title}/>;
			case "update":
				return (
					<EditForm
						onClose={() => onClose()}
						onUpdate={onUpdate}
						initialValue={initialValue}
					/>
				);
		}
	};
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
export default React.memo(ModalSubIdea);
