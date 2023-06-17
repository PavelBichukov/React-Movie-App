import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { signUpActivation } from "../../redux/action-creators/user-action-creators";




const SignUpActivation = () => {
    const { uid = '', token = '' } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(signUpActivation({
            uid,
            token
        }))
    }, [])
    return (
		<div className="success-container">
				<h1 className="success-title">Success</h1>
		
				<div className="success-sub-title">
				Email confirmed. Your registration is now completed
				</div>
				<p className="sign-up-section__form-registration" >
                    Уже есть аккаунт? <NavLink to = '/sign-in' className="sign-section__form-link">Войти в аккаунт</NavLink>
                </p>
		</div>
	)
}

export default SignUpActivation