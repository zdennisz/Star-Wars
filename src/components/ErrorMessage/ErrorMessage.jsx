import React from "react";
import "./ErrorMessage.css";
import ErrorImage from "./../../assets/error_image.jpg";
const ErrorMessage = ({ message }) => {
	return (
		<div className='error-message-container'>
			<img className='image' src={ErrorImage} alt='error' />
			{message}
		</div>
	);
};

export default ErrorMessage;
