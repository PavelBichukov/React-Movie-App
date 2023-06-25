import { useDispatch, useSelector } from "react-redux"
import { IStoreState } from "../../../types"
import { Movie } from "../Movie"
import './favorite-movies.css'
import { NavLink } from "react-router-dom"
import { clearFavorites } from "../../../redux/action-creators/user-action-creators"



const FavoriteMovies = () => {
    const language = useSelector((state: IStoreState) => state.movies.language) 
    const movies = useSelector((state: IStoreState) => state.user.favorites)
    const dispatch = useDispatch()
    return (
        <section className="favorite-movies">
            <div className="favorite-movies__background">
                <div className="favorite-movies__container">
                    <div className="favorite-movies__buttons-block">
                    <NavLink className="favorite-movie__back-to-movies-page" to='/movies-page/'>
                        {language === 'ru-RU' ? "Вернуться на главную" : "Back to home"}
                    </ NavLink>
                    <button 
                    style={{visibility : movies.length ? 'visible' : 'hidden'}}
                    className="favorite-movie__clear-favorites"
                        onClick={() => dispatch(clearFavorites())}
                    > 
                    {language === 'ru-RU' ? "Очистить избранное" : "Clear favorites"}
                    </button>
                    </div>
                    <h3 className="favorite-movies__tittle">{language === 'ru-RU' ? "Избранные фильмы" : "Favorites"}:</h3>
                    {
                        movies.length ?
                            <div className="favorite-movies__movies-box">
                                {
                                    movies.map((movie, index) => <Movie key={index} index={movie.id} movieInfo={movie} />)
                                }
                            </div> :
                            <h3 className="favorite-movies__empty">
                                {language === 'ru-RU' ? "У вас нет сохраненных фильмов..." : "You don't have favorites..."}

                            </h3>
                    }
                </div>
            </div>
        </section>
    )
}



export default FavoriteMovies