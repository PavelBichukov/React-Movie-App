import { useEffect, useState } from "react"
import { BurgerMenu, SearchedMovie, UserBox } from "../index"
import './header.css'
import { useDispatch, useSelector } from "react-redux"
import { IStoreState } from "../../types"
import { loadSearchResults, setLanguage } from "../../redux/action-creators/movies-action-creators"
import { NavLink } from "react-router-dom"

const Header = () => {
    const currentUser = useSelector((state: IStoreState) => state.user.user);
    const isAuthorized = !!currentUser?.id;
    const [inputState, setInputState] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const searchResults = useSelector((state: IStoreState) => state.movies.searchResults)
    const language = useSelector((state: IStoreState) => state.movies.language)
    const dispatch = useDispatch()
    const handlerLanguageChange = (e:any) =>{
        dispatch(setLanguage(e.target.id))
    }
    const handlerInputClose = () => {
        setInputState(!inputState)
        setSearchValue('')
    }
    useEffect(() => {
        dispatch(loadSearchResults(searchValue, language))
    }, [searchValue])
    return (
        <section className="header">
            <div className="header__container">
                <div className="header__menu-logo-box">
                <BurgerMenu/>
                <NavLink className="header-logo" to='/movies-page/'
                style={{visibility: isAuthorized? 'visible' : 'hidden'}}
                >🎞 CineMax</ NavLink>
                </div>
                <div className="header__language-toggle"
                    style={{visibility: isAuthorized? 'visible' : 'hidden'}}>
                    <button
                    disabled ={language === 'en-EN'}
                    className="header__language-en" id="en-EN" 
                    onClick={(e) => handlerLanguageChange(e)}
                    >
                        EN
                    </button>
                    <button 
                    disabled ={language === 'ru-RU'}
                    className="header__language-ru" id="ru-RU" 
                    onClick={(e) => handlerLanguageChange(e)}
                    >
                        RU
                    </button>
                </div>
                <div className="header-search-box" style={{display: isAuthorized? '' : 'none'}}>
                    <button className="header-search-button"
                        onClick={() => handlerInputClose()}
                    >{inputState ? '🔍︎' : '❌'}</button>
                    <div className="header-search">
                        <input
                            type="text" className="header-search-input"
                            disabled={inputState}
                            placeholder={language === 'ru-RU' ? "Поиск..." : "Search..."}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            autoFocus
                        />
                        <div className="header-search-results" style={{ display: inputState ? 'none' : 'flex' }} onClick={() => handlerInputClose()} >
                            {
                                searchResults.map((movie, index) => <SearchedMovie key={index} movieInfo={movie} index={index} />)
                            }
                        </div>
                    </div>
                </div>
                <UserBox />
            </div>
        </section>
    )
}

export default Header