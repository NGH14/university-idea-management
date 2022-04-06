import "./style.css";

import Button from "@mui/material/Button";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Icon404 from "../../assets/images/MnQWcWb6SrY.svg";

export default function NotMatchPage() {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className='notfound_page'>
			<img className='notfound_logo' src={Icon404} alt='' />
			<h2 id='notfound_header'>Page for URL not found </h2>
			<p id='notfound_text'>{`Not match "${location.pathname}", please try a different URL`}</p>
			<section className='notfound_buttonwrapper'>
				<Button variant='contained' onClick={() => navigate('/')}>
					Return to homepage
				</Button>
				<Button variant='text' onClick={() => navigate(-1)}>
					Go back
				</Button>
			</section>
		</div>
	);
}
