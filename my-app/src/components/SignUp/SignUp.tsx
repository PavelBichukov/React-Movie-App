import { useState } from "react";
import { useDispatch } from "react-redux";
import './sign-up.css'
import { NavLink } from "react-router-dom";
import { signUp } from "../../redux/action-creators/user-action-creators";
//Apq8064adreno


const SignUp =() =>{
    const dispatch = useDispatch()
    const [nameText, setNameText] = useState("");
	const [emailText, setEmailText] = useState("");
	const [passwordText, setPasswordText] = useState("");
    return(
        <div>
            <div className="sign-up-section">
            <div className="sign-up-section__container">
            <div className="sign-up-section__form" >
            <h2 className="sign-up-section__tittle">Регистрация</h2>
            <label className='sign-up-section__input-label'> Имя
                    <input className="sign-up-section__form-input" type="text" placeholder="Имя"
                    onChange={(e) => setNameText(e.target.value)}
                    />
                </label>
                <label className='sign-up-section__input-label'> Почта
                    <input className="sign-up-section__form-input" type="email" placeholder="Ваша почта"
                    onChange={(e) => setEmailText(e.target.value)}
                    />
                </label>
                <label className='sign-up-section__input-label'> Пароль
                    <input className="sign-up-section__form-input" type="password" minLength={8} placeholder="Ваш пароль"
                    onChange={(e) => setPasswordText(e.target.value)}/>
                </label>
                <button className="sign-up-section__form-sign-button" type="submit"
                onClick={() => {
                    dispatch(signUp({
                        "username": nameText,
                        "email": emailText,
                        "password": passwordText,
                    }))
                }}
                >Регистрация</button>
                <p className="sign-up-section__form-registration" >
                    Уже есть аккаунт? <NavLink to = '/sign-in' className="sign-section__form-link">Войти в аккаунт</NavLink>
                </p>
            </div>
            </div>
        </div>
        </div>
    )
}

export default SignUp