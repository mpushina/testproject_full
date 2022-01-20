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

function App() {
	
 const [choose, showChoose] = useState(false);	
 const [login, showPass] = useState(false);
 const [register, showReg] = useState(false);
 
 const { value:email, bind:bindEmail } = useInput('');
 const { value:password, bind:bindPassword } = useInput('');
 const { value:name, bind:bindName } = useInput('');
 const { value:phone, bind:bindPhone } = useInput('');
 
 const headers = {'Content-Type': 'application/json','Accept': 'application/json'};
	
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
  
   const handleLogin = (evt) => {
	   
	if(evt)
		evt.preventDefault();

	if(email && password)
	{
		var data = {
			email: email,
			password: password
		}
		
		axios.post("https://lumus.wistis.ru/api/v1/auth/login", data, {headers: headers})
		.then((response) => {
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user', response.data.user);

			console.log(localStorage.getItem('token'));
			console.log(localStorage.getItem('user'));
		})
		.catch((error) => {console.log(error);})
	}
  }
  
 
  
  const handleRegister = (evt) => {
    evt.preventDefault();
		
	if(email && password)
	{
		var data = {
			email: email,
			password: password,
			name: name,
			phone: phone
		}
		 
		axios.post("https://lumus.wistis.ru/api/v1/auth/register", data, {headers: headers})
		.then((response) => {
			handleLogin();
		})
		.catch((error) => {console.log(error);})
	}
  }
	
  return (
    <div>
		<button
			onClick={() => showChoose(!choose)}
			type="button"
			className="button_test"
			data-toggle="login1"
		  >
		  Вход или Регистрация
		  </button>
		  
		{choose && (
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
		)}
		
		
		{login && (
			<div className="modal" id="login2">
				<div className="modal__bg" onClick={() => showPass(!login)}></div>
				<div className="modal-dialog">
					<div className="modal__top">
						<div className="modal__title">
							<Arrow />
							<span>Вход</span>
						</div>
						<button className="modal__close" onClick={() => showPass(!login)}>
							<ClosePopup />
						</button>
					</div>
					<div className="modal__content">
						<form className="modal__form form-group" onSubmit={handleLogin}>
							<div className="modal__form-group">
								<label>E-mail</label>
								<input type="email" {...bindEmail} placeholder="E-mail" />
							</div>
							<div className="modal__form-group form-group">
								<label>Пароль</label>
								<input type="password" {...bindPassword} placeholder="Пароль" />
							</div>
							<button className="modal__form-btn btn btn-blue">Войти</button>
							<button className="modal__forgot btn">Забыли пароль?</button>
						</form>
					</div>
				</div>
			</div>
		)}


		{register && (
			 <div className="modal" id="reg">
				<div className="modal__bg" onClick={() => showReg(!register)}></div>
				<div className="modal-dialog">
					<div className="modal__top">
						<div className="modal__title">
							<span>Регистрация</span>
						</div>
						<button className="modal__close" onClick={() => showReg(!register)}>
							<ClosePopup />
						</button>
					</div>
					<div className="modal__content">
						<form className="modal__form" onSubmit={handleRegister}>
							<div className="modal__form-group form-group">
								<label>E-mail</label>
								<input type="email" {...bindEmail} placeholder="E-mail" />
							</div>
							<div className="modal__form-group form-group">
								<label>Пароль</label>
								<input type="password" {...bindPassword} placeholder="Пароль" />
							</div>
							<div className="modal__form-group form-group">
								<label>Имя Фамилия</label>
								<input type="text" {...bindName} placeholder="Имя Фамилия" />
							</div>
							<div className="modal__form-group form-group">
								<label>Телефон</label>
								<input type="tel" {...bindPhone} placeholder="Телефон" />
							</div>
							<button className="modal__form-btn btn btn-blue">Создать аккаунт</button>
						</form>
						<div className="modal__hint">
							Нажимая на «Создать аккаунт», вы соглашаетесь с <a href="">Политикой обработки данных</a>
						</div>
					</div>
				</div>
			</div>
		)}
    </div>
  );
}

export default App;
