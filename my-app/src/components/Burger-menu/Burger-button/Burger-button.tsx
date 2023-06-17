import { useState } from "react"
import { IBurger } from "../../../types"
import './burger-button.css'

// const MenuButton = () => {
//     const [active, setActive] = useState(false)
//     return (
//         <button
//             className={active ? "menu-button active" : "menu-button"}
//             onClick={() => setActive(!active)}>
//             <span className="menu-button__decor"></span>
//         </button>
//     )
// }

const MenuButton = ({ active, callback }: IBurger) => {
    return (
        <button
            className={active ? "menu-button active" : "menu-button"}
            onClick={() => callback()}>
            <span className="menu-button__decor"></span>
        </button>
    )
}


export default MenuButton