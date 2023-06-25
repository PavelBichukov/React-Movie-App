import { useDispatch, useSelector } from "react-redux"
import { setCurrentPage, setGenres, setSorting } from "../../redux/action-creators/movies-action-creators"
import { IStoreState } from "../../types"
import './filters-bar.css'
import { useState } from "react"


export const SideFiltersBar = () => {
    const [showAllGenres, setShowAllGenres] = useState(false)
    const language = useSelector((state: IStoreState) => state.movies.language)
    const [stateSelect, setSelect] = useState('Сортировать')
    const [showSelect, setShowSelect] = useState(false)
    const currentPage = useSelector((state: IStoreState) => state.movies.currentPage)
    const totalPages = useSelector((state: IStoreState) => state.movies.totalPages)
    const dispatch = useDispatch()
    const handlerSetSorting = (e: any) => {
        setShowSelect(!showSelect)
        setSelect(e.target.value)
        dispatch(setSorting(e.target.id))
    }
    const handlerSetGenres = (e: any) => {
        dispatch(setGenres(e.target.id))
    }
    return (
        <section className="filters-bar">
            <span className="custom-select__filters">{language === 'ru-RU' ? "Фильтры" : "Filters"}</span>
            <div className="custom-select">
                <button value={'sdf'} className="select-button" onClick={() => setShowSelect(!showSelect)}>
                    {stateSelect === 'Сортировать'? 
                    language === 'ru-RU' ? "Популярные 🠗" : "Popular 🠗" :
                    stateSelect}
                    </button>
                <div className="custom-select__option-box"
                    style={{ transform: showSelect ? 'scale(1)' : '', height: showSelect ? 'auto' : '0px' }}
                >
                    <button id="popularity.desc" className="option" value={language === 'ru-RU' ? "Популярные 🠗" : "Popular 🠗"}
                        onClick={(e) => handlerSetSorting(e)}
                    >{language === 'ru-RU' ? "Популярные 🠗" : "Popular 🠗"} </button>
                    <button id="popularity.asc" className="option" value={language === 'ru-RU' ? "Популярные 🠕" : "Popular 🠕"}
                        onClick={(e) => handlerSetSorting(e)}
                    >{language === 'ru-RU' ? "Популярные 🠕" : "Popular 🠕"} </button>
                    <button id="vote_average.desc" className="option" value={language === 'ru-RU' ? "Рейтинг 🠗" : "Rate 🠗"}
                        onClick={(e) => handlerSetSorting(e)}
                    >{language === 'ru-RU' ? "Рейтинг 🠗" : "Rate 🠗"} </button>
                    <button id="vote_average.asc" className="option" value={language === 'ru-RU ' ? "Рейтинг 🠕" : "Rate 🠕"}
                        onClick={(e) => handlerSetSorting(e)}
                    >{language === 'ru-RU' ? "Рейтинг 🠕" : "Rate 🠕"} </button>
                </div>
            </div>
            <button className="filters-bar__show-all-genres"
                onClick={() => setShowAllGenres(!showAllGenres)}
                style={{ backgroundColor: showAllGenres ? '#f4a900' : '' }}
            >
                {
                !showAllGenres ? 
                language === 'ru-RU' ? "Показать все жанры" : "Show all genres": 
                language === 'ru-RU' ? "Скрыть все жанры" : "Hide all genres"
                }
            </button>
            <div className="filters-bar__box" style={{ maxHeight: showAllGenres ? '40vh' : '10vh' }} onChange={(e) => handlerSetGenres(e)}>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="боевик" id="28" />
                    <label htmlFor="28">{language === 'ru-RU' ? "Боевик" : "Action"}</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="приключения" id="12" />
                    <label htmlFor="12">{language === 'ru-RU' ? "Приключение" : "Adventure"}</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="мультфильм" id="16" />
                    <label htmlFor="16">{language === 'ru-RU' ? "Мультфильм" : "Animaton"}</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="комедия" id="35" />
                    <label htmlFor="35">{language === 'ru-RU' ? "Комедия" : "Comedy"}</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="криминал" id="80" />
                    <label htmlFor="80">{language === 'ru-RU' ? "Криминал" : "Crime"}</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="документальный" id="99" />
                    <label htmlFor="99">{language === 'ru-RU' ? "Документальный" : "Documentary"}</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="фэнтези" id="14" />
                    <label htmlFor="14">{language === 'ru-RU' ? "Фэнтези" : "Fantasy"}</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="ужасы" id="27" />
                    <label htmlFor="27">{language === 'ru-RU' ? "Ужасы" : "Horror"}</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="музыка" id="10402" />
                    <label htmlFor="10402">{language === 'ru-RU' ? "Музыка" : "Music"}</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="детектив" id="9648" />
                    <label htmlFor="9648">{language === 'ru-RU' ? "Детектив" : "Mystery"}</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="фантастика" id="878" />
                    <label htmlFor="878">{language === 'ru-RU' ? "Фантастика" : "Science fiction"}</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="вестерн" id="37" />
                    <label htmlFor="37">{language === 'ru-RU' ? "Вестерн" : "Western"}</label>
                </div>
            </div>
            <h4 className="filters-bar__pagination-tittle">{language === 'ru-RU' ? "Страницы" : "Pages"}</h4>
            <div className="filters-bar__pagination">
                <button className="filters-bar__pagination-button"
                    disabled={currentPage === 1}
                    onClick={() => { dispatch(setCurrentPage(currentPage - 1)) }}
                >❮</button>
                <span className="filters-bar__pagination-page">{currentPage} из {totalPages}</span>
                <button className="filters-bar__pagination-button"
                    onClick={() => { dispatch(setCurrentPage(currentPage + 1)) }}
                >❯</button>
            </div>
        </section>
    )
}


export default SideFiltersBar