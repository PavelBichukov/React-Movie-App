import { useState } from "react";
import './sign-in.css'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signIn } from "../../redux/action-creators/user-action-creators";
import { HidePassIcon } from "../Icons/HidePassIcon";
import { ShowPassIcon } from "../Icons/ShowPassIcon";



const SignIn = () => {
    const dispatch = useDispatch()
    const [passwordText, setPasswordText] = useState("");
    const [showPass, SetShowPass] = useState(false)
    const [emailText, setEmailText] = useState("");
    return (
        <div className="sign-section">
            <div className="sign-section__container">
                <div className="sign-section__form">
                    <h2 className="sign-section__tittle">Вход</h2>
                    <label className='sign-section__input-label'> Почта
                        <input className="sign-section__form-input" type="email" placeholder="Ваша почта"
                            onChange={(e) => setEmailText(e.target.value)}
                            autoFocus
                        />
                    </label>
                    <label className='sign-section__input-label'> Пароль
                        <div className='sign-section__input-box'>
                            <input className="sign-section__form-input" type={showPass ? 'text' : 'password'} minLength={6} placeholder="Ваш пароль"
                                onChange={(e) => setPasswordText(e.target.value)} />
                            <div
                                className="sign-section__show-pass-icon"
                                onClick={() => SetShowPass(!showPass)}>
                                {
                                    showPass ? <ShowPassIcon className="eye-show" />:
                                    <HidePassIcon className="eye-show" />
                                }
                            </div>
                        </div>
                    </label>
                    <button className="sign-section__form-sign-button"
                        onClick={() => {
                            dispatch(signIn({
                                "email": emailText,
                                "password": passwordText,
                            }))
                        }}
                    >Вход</button>
                    <p className="sign-section__form-registration" >
                        У вас нет аккаунта? <NavLink to='/sign-up' className="sign-section__form-link">Регистрация</NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn