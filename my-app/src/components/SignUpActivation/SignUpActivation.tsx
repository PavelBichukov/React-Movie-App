import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { signUpActivation } from "../../redux/action-creators/user-action-creators";
import './activation.css'



const SignUpActivation = () => {
    const [text, setText] = useState('')
    const split = text.split('/')
    const uid = split[split.length - 2]
    const token = split[split.length - 1]
    const dispatch = useDispatch();
    return (
        <div className="activation">
            <div className="activation__container">
                <div className="activation__content-block">
                    <h2 className="activation__tittle">Check you email</h2>
                    <p className="activation__text">A link has been sent to your email, copy it, paste it into the field below, and click <mark>Send</mark> <a href=""></a></p>
                    <input className="activation__input" type="text"
                    onChange={(e) => setText(e.target.value)} />
                    <button className="activation__send-button"
                        disabled={text === ''}
                        onClick={() => {
                            dispatch(signUpActivation({
                                uid,
                                token
                            }))
                        }}
                    >Send</button>
                </div>
            </div>
        </div>
    )
}

export default SignUpActivation