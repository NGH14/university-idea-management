import "./style.css";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import loginImg from "../../assets/images/Contact-CIC-Education-2-1024x858.webp";
import { AuthRequest } from "../../common/AppUse";
import { API_PATHS, DEV_CONFIGS } from "../../common/env";
import TabProfile from "../../components/TabProfile";
import { UserContext } from "../../context/AppContext";
import { dataDemo } from "../UserManagement/FakeData";

const toastMessages = {
	ERR_SERVER_ERROR: "Something went wrong, please try again !!",
	ERR_USER_NOT_FOUND: "User not found !!",
};

export default function UpdatePassword() {
	const [searchParams] = useSearchParams();
	const [user, setUser] = useState({});

	const email = searchParams.get("email");

	useEffect(() => {
		if (DEV_CONFIGS.IS_DEV) {
			let user = dataDemo.find((_) => _.email === email);

			if (!user) {
				toast.error(toastMessages.ERR_USER_NOT_FOUND);
				return;
			}
			setUser(user);
			return;
		}

		loadData();
	}, []);

	const loadData = async () => {
		await AuthRequest.get(`${API_PATHS.SHARED.USER}/${email}`)
			.then((res) => setUser(res?.data?.result))
			.catch(() => {
				toast.error(toastMessages.ERR_SERVER_ERROR, {
					style: { width: "auto" },
				});
			});
	};

	return (
		<div className="profile_wrapper">
			<div className="avatar_wrapper">
				<img className="avatar_cover" src={loginImg} alt="avatar_cover" />
				<Box className="avatar_content" sx={{ display: "flex", gap: 1.5 }}>
					<Avatar
						alt={user.full_name ?? ""}
						src="/static/images/avatar/2.jpg"
						className="avatar_img"
					/>
					<Stack>
						<Typography fontWeight={700} fontSize={30} sx={{ mt: -1 }}>
							{user.full_name ?? ""}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{user.role ?? ""}
						</Typography>
					</Stack>
				</Box>
			</div>
			{/* <div className="updatepassword-wrapper">
				{changePasswordMoDal && <UpdatePasswordForm />}
			</div> */}

			<TabProfile />
		</div>
	);
}
