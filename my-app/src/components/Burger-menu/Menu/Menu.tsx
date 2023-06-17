import { useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import './menu.css'
import { IUser } from "../../../types"
import { setUser } from "../../../redux/action-creators/user-action-creators"


const Menu = ({ active, func }: any) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogOut = () =>{
        dispatch(setUser({} as IUser))
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        navigate ('/sign-in')
        func(!active)
    }
    return (
        <div className={active ? "burger-menu-disabled" : "burger-menu-active"}>
            <div>
                <div className="burger-menu__list">
                    <NavLink  to='/favorite-movies'
                        className='burger-menu__favorites'
                        onClick={() => func(!active)}
                    >
                        Сохраненные фильмы
                    </NavLink>
                </div>
            </div>
                <button className='burger-menu__logout'
                onClick={()=> handleLogOut()}
                >
                    Выйти из аккаунта
                </button>
        </div>
    )
}

export default Menu



