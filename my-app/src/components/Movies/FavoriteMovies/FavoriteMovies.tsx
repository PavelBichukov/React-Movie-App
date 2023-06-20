import { useSelector } from "react-redux"
import { IStoreState } from "../../../types"
import { Movie } from "../Movie"
import './favorite-movies.css'
import { NavLink } from "react-router-dom"



const FavoriteMovies = () => {
    const language = useSelector((state: IStoreState) => state.movies.language) 
    const movies = useSelector((state: IStoreState) => state.user.favorites)
    return (
        <section className="favorite-movies">
            <div className="favorite-movies__background">
                <div className="favorite-movies__container">
                    <NavLink className="favorite-movie__back-to-movies-page" to='/movies-page/'> {language === 'ru-RU' ? "Вернуться на главную" : "Back to home"}</ NavLink>
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