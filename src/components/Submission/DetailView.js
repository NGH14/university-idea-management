import "../../containers/UserManagement/style.css";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import _ from "lodash";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthRequest } from "../../common/AppUse";
import { URL_PATHS } from "../../common/env";
import DetailSubmissionForm from "./DetailSubmissionForm";
import ModalSubmissionIdea from "./Modal/ModalSubmissionIdea";
import IdeaSubView from "./IdeaSubView";

function DetailView() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [status, setStatus] = useState({
		visibleModal: false,
		action: "update",
		loading: false,
	});
	const [initialValue, setInitialValue] = useState([]);

	useEffect(() => {
		loadData();
	}, []);
	const loadData = async () => {
		setStatus({ ...status, loading: true });
		try {
			const res = await AuthRequest.get(`submission-management/${id}`);
			if (res?.data?.succeeded) {
				const value = res?.data?.result;
				const newValue = {
					...value,
					initial_date_v: moment(value?.initial_date).format("DD/MM/YYYY"),
					final_date_v: moment(value?.final_date).format("DD/MM/YYYY"),
				};
				setInitialValue(newValue);
				setStatus({ ...status, loading: false, visibleModal: false });
			}
		} catch {}
	};

	const onCloseModal = () => {
		setStatus({ ...status, visibleModal: false });
	};
	const onOpenModal = (action) => {
		setStatus({ ...status, visibleModal: true, action: action });
	};
	const onUpdate = async (value) => {
		setStatus({
			...status,
			loading: true,
		});
		try {
			const res = await AuthRequest.put(
				`submission-management/${value?.id}`,
				value,
			);
			if (res?.data?.succeeded) {
				setStatus({
					...status,
					visibleModal: false,
				});
				await loadData();
			}
		} catch {}
	};
	const onCloseNotification = () => {
		setStatus({ ...status, visibleNotification: false });
	};
	const renderModal = () => {
		return (
			<ModalSubmissionIdea
				visible={status.visibleModal}
				action={status.action}
				onClose={onCloseModal}
				initialValue={initialValue}
				onUpdate={onUpdate}
			/>
		);
	};
	const renderTop = () => {
		return (
			<div style={{ textAlign: "right" }}>
				<Button
					size={"small"}
					variant="contained"
					style={{ backgroundColor: "#9e9e9e", marginRight: 15 }}
					endIcon={<ArrowBackIcon />}
					onClick={() => navigate(`${URL_PATHS.MANAGE_SUB}`)}
				>
					Back
				</Button>
				<Button
					size={"small"}
					variant="contained"
					style={{ backgroundColor: "#4caf50", marginRight: 15 }}
					endIcon={<EditIcon />}
					onClick={() => onOpenModal("update")}
				>
					Edit Submission
				</Button>

				<Button
					size={"small"}
					variant="contained"
					endIcon={<AddIcon />}
					onClick={() => onOpenModal("create")}
				>
					Create Idea
				</Button>
			</div>
		);
	};
	const renderDetailSubmissionForm = () => {
		return (
			<fieldset
				style={{ border: "2px solid gray", padding: 12, borderRadius: 8 }}
			>
				<legend style={{ fontWeight: "bold", padding: 8, fontSize: 22 }}>
					Information Submission
				</legend>

				<DetailSubmissionForm initialValue={initialValue} />
			</fieldset>
		);
	};
	const renderIdeaView = () => {
		return (
			<fieldset
				style={{
					border: "2px solid gray",
					padding: 12,
					borderRadius: 8,
					marginTop: 30,
				}}
			>
				<legend
					style={{
						fontWeight: "bold",
						padding: 8,
						fontSize: 22,
						display: "flex",
					}}
				>
					List Idea{" "}
				</legend>
				<IdeaSubView initialValue={initialValue} />
			</fieldset>
		);
	};
	if (_.isEmpty(initialValue) || status.loading) {
		return <CircularProgress size={100} />;
	}
	return (
		<div>
			{renderTop()}
			{renderDetailSubmissionForm()}
			{renderIdeaView()}
			{status.visibleModal && renderModal()}
		</div>
	);
}
export default DetailView;
