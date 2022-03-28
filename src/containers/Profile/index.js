import "./style.css";

import React, { useContext, useState } from "react";
import loginImg from "../../assets/images/Contact-CIC-Education-2-1024x858.webp";
import UpdatePasswordForm from "../../components/UpdatePasswordForm";
import { UserContext } from "../../context/AppContext";

export default function UpdatePassword() {
	const { state, setState } = useContext(UserContext);
	const [changePasswordMoDal, setchangPassworModal] = useState(false);
	return (
		<>
			{/* <div className="profile_title">
				<div className="profile_heading">
					<h2>Management User</h2>
				</div>
			</div> */}

			<div className="avatar_wrapper">
				<img className="avatar_cover" src={loginImg} />
				<img
					className="avatar_img"
					src="https://scontent.fsgn6-2.fna.fbcdn.net/v/t1.6435-1/78063560_2418338788389098_6031660699644592128_n.jpg?stp=dst-jpg_s320x320&_nc_cat=105&ccb=1-5&_nc_sid=7206a8&_nc_ohc=zVedmM7yFcsAX8CdgDo&_nc_ht=scontent.fsgn6-2.fna&oh=00_AT9AGRw_CmvhzUATiBuGhrPlqE99p48jU-mFGQEwyr9bDA&oe=6268FD0D"
				/>
			</div>
			<div className="updatepassword-wrapper">
				{changePasswordMoDal && <UpdatePasswordForm />}
			</div>
		</>
	);
}
