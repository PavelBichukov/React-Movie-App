import { useDispatch, useSelector } from "react-redux"
import { setCurrentPage, setGenres, setSorting } from "../../redux/action-creators/movies-action-creators"
import { IStoreState } from "../../types"
import './filters-bar.css'
import { useState } from "react"


export const SideFiltersBar = () => {
    const [showAllGenres, setShowAllGenres] = useState(false)
    const [stateSelect, setSelect] = useState('Популярные 🠗')
    const [showSelect, setShowSelect] = useState(false)
    const genres = useSelector((state: IStoreState) => state.movies.genres)
    const currentPage = useSelector((state: IStoreState) => state.movies.currentPage)
    const dispatch = useDispatch()
    const handlerSetSorting = (e: any) => {
        setShowSelect(!showSelect)
        setSelect(e.target.value)
        dispatch(setSorting(e.target.id))
    }

    // const handlerSetSortParams = (e: any) => {
    //     dispatch(setSorting(e.target.value))
    // }
    const handlerSetGenres = (e: any) => {
            dispatch(setGenres(e.target.id))
    }
    return (
        <section className="filters-bar">
            <span className="custom-select__filters">Фильтры:</span>
            <div className="custom-select">
                <button value={'sdf'} className="select-button" onClick={() => setShowSelect(!showSelect)}>{stateSelect}</button>
                <div className="custom-select__option-box"
                     style={{transform: showSelect? 'scale(1)' : '', height: showSelect? 'auto' : '0px'}}
                     >
                    <button id="popularity.desc" className="option" value={'Популярные 🠗'} 
                    onClick={(e) => handlerSetSorting(e)}
                    >Популярные 🠗</button>
                    <button id="popularity.asc" className="option" value={'Популярные 🠕'}
                    onClick={(e) => handlerSetSorting(e)}
                    >Популярные 🠕</button>
                    <button id="vote_average.desc" className="option" value={'Рейтинг 🠗'}
                    onClick={(e) => handlerSetSorting(e)}
                    >Рейтинг 🠗</button>
                    <button id="vote_average.asc" className="option" value={'Рейтинг 🠓'}
                    onClick={(e) => handlerSetSorting(e)}
                    >Рейтинг 🠕</button>
                </div>
            </div>
            {/* <select  className="filters-bar__select" name="sort" id="" onChange={(e) => handlerSetSortParams(e)}>
                <option value="popularity.desc">Популярные по убыванию</option>
                <option value="popularity.asc">Популярные по возрастанию</option>
                <option value="vote_average.desc">Рейтинг по убыванию</option>
                <option value="vote_average.asc">Рейтинг по возрастанию</option>
            </select> */}
            <button className="filters-bar__show-all-genres"
            onClick={() => setShowAllGenres(!showAllGenres)}
            style={{backgroundColor: showAllGenres ? '#f4a900' : '' }}
            >
            {!showAllGenres? 'Показать все жанры' : 'Скрыть жанры' }
            </button>
            <div className="filters-bar__box" style={{maxHeight: showAllGenres? '900px' : '100px'}} onChange={(e) => handlerSetGenres(e)}>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="боевик" id="28" />
                    <label htmlFor="28">Боевик</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="приключения" id="12"/>
                    <label htmlFor="12">Приключения</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="мультфильм" id="16"/>
                    <label htmlFor="16">Мультфильм</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="комедия" id="35"/>
                    <label htmlFor="35">Комедия</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="криминал" id="80" />
                    <label htmlFor="80">Криминал</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="документальный" id="99"/>
                    <label htmlFor="99">Документальный</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="фэнтези" id="14"/>
                    <label htmlFor="14">Фэнтези</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="ужасы" id="27" />
                    <label htmlFor="27">Ужасы</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="музыка" id="10402"/>
                    <label htmlFor="10402">Музыка</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="детектив" id="9648"/>
                    <label htmlFor="9648">Детектив</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="фантастика" id="878" />
                    <label htmlFor="878">Фантастика</label>
                </div>
                <div className="filters-bar__box-checkbox">
                    <input type="checkbox" name="вестерн" id="37" />
                    <label htmlFor="37">Вестерн</label>
                </div>
            </div>
            {/* <button className="filters-bar__clear-filters">Очистить фильтры</button> */}
            <div className="filters-bar__pagination">
                <button className="filters-bar__pagination-button"
                disabled={currentPage === 1}
                onClick={() => {dispatch(setCurrentPage(currentPage - 1))}}
                >Назад</button>
                <span className="filters-bar__pagination-page">{currentPage}</span>
                <button className="filters-bar__pagination-button"
                onClick={() => {dispatch(setCurrentPage(currentPage + 1))}}
                >Вперёд</button>
            </div>
        </section>
    )
}


export default SideFiltersBar