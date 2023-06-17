import { useState } from "react"
import './burger-menu.css'
import { MenuButton } from "./Burger-button"
import { Menu } from "./Menu"
import { useSelector } from "react-redux"
import { IStoreState } from "../../types"

const BurgerMenu =( )=>{
    const currentUser = useSelector((state: IStoreState) => state.user.user);
    const isAuthorized = !!currentUser?.id;
    const [active, setActive] = useState(false)
    return(
        <div className="burger-menu" style={{display: isAuthorized? '' : 'none'}}>
            <MenuButton active={active} callback={()=>setActive(!active)}/>
            <Menu active= {active} func = {setActive}/>
        </div>
    )
}


export default BurgerMenu