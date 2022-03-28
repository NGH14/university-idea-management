import "./style.css";

import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import loginImg from "../../assets/images/Contact-CIC-Education-2-1024x858.webp";

import { UserContext } from "../../context/AppContext";
import TabProfile from "../../components/TabProfile";

export default function UpdatePassword() {
	const { state, setState } = useContext(UserContext);

	return (
		<div className="profile_wrapper">
			<div className="avatar_wrapper">
				<img className="avatar_cover" src={loginImg} alt="avatar_cover" />
				<Box className="avatar_content" sx={{ display: "flex", gap: 1.5 }}>
					<Avatar
						alt={state.dataUser.full_name ?? "Username"}
						src="/static/images/avatar/2.jpg"
						className="avatar_img"
					/>
					<Stack>
						<Typography fontWeight={700} fontSize={30} sx={{ mt: -1 }}>
							{state.dataUser.full_name ?? "Username"}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{state.dataUser.role ?? "admin"}
						</Typography>
					</Stack>
				</Box>
			</div>
			{/* <div className="updatepassword-wrapper">
				{changePasswordMoDal && <UpdatePasswordForm />}
			</div> */}

			<TabProfile></TabProfile>
		</div>
	);
}
