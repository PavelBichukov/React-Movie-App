import { useSelector } from "react-redux"
import { IStoreState } from "../../../types"
import { Movie } from "../Movie"
import './favorite-movies.css'
import { NavLink } from "react-router-dom"



const FavoriteMovies = () => {
    const movies = useSelector((state: IStoreState) => state.user.favorites)
    return (
        <section className="favorite-movies">
            <div className="favorite-movies__background">
                <div className="favorite-movies__container">
                    <NavLink className="favorite-movie__back-to-movies-page" to='/movies-page/'> Вернуться на главную</ NavLink>
                    <h3 className="favorite-movies__tittle">Сохраненные фильмы:</h3>
                    {
                        movies.length ?
                            <div className="favorite-movies__movies-box">
                                {
                                    movies.map((movie, index) => <Movie key={index} index={movie.id} movieInfo={movie} />)
                                }
                            </div> :
                            <h3 className="favorite-movies__empty">
                                У вас нет сохраненных фильмов...
                            </h3>
                    }
                </div>
            </div>
        </section>
    )
}



export default FavoriteMovies