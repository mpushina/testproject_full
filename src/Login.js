import './css/style.css';
import React, { useState, useEffect } from "react";
import { useInput } from './hooks/input-hook';
import axios from 'axios';

import {ReactComponent as ClosePopup} from './images/close.svg';
import {ReactComponent as GoogleLogo} from './images/google.svg';
import {ReactComponent as AppleLogo} from './images/apple.svg';
import {ReactComponent as VkLogo} from './images/vk.svg';
import {ReactComponent as FbLogo} from './images/fb.svg';
import {ReactComponent as Arrow} from './images/arrow.svg';

function Login() {
	
	const [choose, showChoose] = useState(false);	
	const { value:email, bind:bindEmail } = useInput('');
	
	const handleCheck = (evt) => {
    evt.preventDefault();
		
	if(email)
	{
		var data = {
			email: email
		}
		 
		axios.post("https://lumus.wistis.ru/api/v1/auth/check-email", data, {headers: headers})
		.then((response) => {
			if(response.data.exists){
				showPass(true);
				showReg(false);
				showChoose(false);
			}
			else{
				showPass(false);
				showReg(true);
				showChoose(false);
			}
		})
		.catch((error) => {console.log(error);})
	}
  }

	return (
		<div className="modal" id="login1">
				<div className="modal__bg" onClick={() => showChoose(!choose)}></div>
				<div className="modal-dialog">
					<div className="modal__top">
						<div className="modal__title">
							<span>Вход или регистрация</span>
						</div>
						<button className="modal__close" onClick={() => showChoose(!choose)}> 
							<ClosePopup />
						</button>
					</div>
					<div className="modal__content">
						<form className="modal__form" onSubmit={handleCheck}>
							<div className="modal__form-group form-group">
								<label>E-mail</label>
								<input type="email" {...bindEmail} placeholder="E-mail" />
							</div>
							<button className="modal__form-btn btn btn-blue">Продолжить</button>
						</form>
					   <div className="modal__or">Или</div>
						<div className="modal__socials">
							<a href="" className="modal__socials-item">
								<GoogleLogo />
							</a>
							<a href="" className="modal__socials-item">
								<AppleLogo />
							</a>
							<a href="" className="modal__socials-item">
								<VkLogo />
							</a>
							<a href="" className="modal__socials-item">
								<FbLogo />
							</a>
						</div>
					</div>
				</div>
			</div>
	);
	
}
export default Login;