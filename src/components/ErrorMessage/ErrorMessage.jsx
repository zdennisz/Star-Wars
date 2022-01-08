import React from "react";
import "./ErrorMessage.scss";
import ErrorImage from "./../../assets/error_image.png";
const ErrorMessage = ({ message }) => {
	return (
		<div className='error-message-container'>
			<img className='image' src={ErrorImage} alt='error' />
			{message}
		</div>
	);
};

export default ErrorMessage;
