import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import './menu.css'
import { IStoreState, IUser } from "../../../types"
import { setUser } from "../../../redux/action-creators/user-action-creators"
import { setLanguage } from "../../../redux/action-creators/movies-action-creators"


const Menu = ({ active, func }: any) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const language = useSelector((state: IStoreState) => state.movies.language)
    const handlerLanguageChange = (e: any) => {
        dispatch(setLanguage(e.target.id))
        func(!active)
    }
    const handleLogOut = () => {
        dispatch(setUser({} as IUser))
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        navigate('/sign-in')
        func(!active)
    }
    return (
        <div className={active ? "burger-menu-disabled" : "burger-menu-active"}>
            <div>
                <NavLink to='/favorite-movies'
                    className='burger-menu__favorites'
                    onClick={() => func(!active)}
                >
                    {language === 'ru-RU' ? "Избранные фильмы" : "Favorites"}
                </NavLink>
            </div>
            <div className='burger-menu__language-toggle'>
                <button
                    disabled={language === 'en-EN'}
                    className="header__language-en" id="en-EN"
                    onClick={(e) => handlerLanguageChange(e)}
                >
                    EN
                </button>
                <button
                    disabled={language === 'ru-RU'}
                    className="header__language-ru" id="ru-RU"
                    onClick={(e) => handlerLanguageChange(e)}
                >
                    RU
                </button>
            </div>
            <button className='burger-menu__logout'
                onClick={() => handleLogOut()}
            >
                {language === 'ru-RU' ? "Выйти из аккаунта" : "Log out"}
            </button>
        </div>
    )
}

// const Menu = ({ active, func }: any) => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const handleLogOut = () =>{
//         dispatch(setUser({} as IUser))
//         localStorage.removeItem('access')
//         localStorage.removeItem('refresh')
//         navigate ('/sign-in')
//         func(!active)
//     }
//     return (
//         <div className={active ? "burger-menu-disabled" : "burger-menu-active"}>
//             <div>
//                 <div className="burger-menu__list">
//                     <NavLink  to='/favorite-movies'
//                         className='burger-menu__favorites'
//                         onClick={() => func(!active)}
//                     >
//                         Сохраненные фильмы
//                     </NavLink>
//                 </div>
//             </div>
//                 <button className='burger-menu__logout'
//                 onClick={()=> handleLogOut()}
//                 >
//                     Выйти из аккаунта
//                 </button>
//         </div>
//     )
// }


export default Menu



