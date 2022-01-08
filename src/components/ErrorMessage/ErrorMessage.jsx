import React from "react";
import ErrorImage from "./../../assets/error_image.png";
import "./ErrorMessage.scss";

const ErrorMessage = ({ message }) => {
	return (
		<div className='error-message-container'>
			<img className='image' src={ErrorImage} alt='error' />
			{message}
		</div>
	);
};

export default ErrorMessage;
