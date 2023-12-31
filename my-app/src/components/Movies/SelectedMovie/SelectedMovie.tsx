import { useDispatch, useSelector } from "react-redux"
import { IMovie, IStoreState } from "../../../types"
import { NavLink, useParams } from "react-router-dom"
import { loadCast, loadSelectedMovie, loadSimilarMovies, loadTrailer } from "../../../redux/action-creators/movies-action-creators"
import { useEffect } from "react"
import { Movie } from "../Movie"
import Iframe from 'react-iframe'
import './selected-movie.css'
import { ActorCard } from "../../Cast"
import { Loader } from "../../Loader"
import { toggleFavorite } from "../../../redux/action-creators/user-action-creators"


const SelectedMovie = () => {
    const { movieId = '' } = useParams()
    const dispatch = useDispatch();
    const favorites = useSelector((state: IStoreState) => state.user.favorites);
    const selectedMovie = useSelector((state: IStoreState) => state.movies.selectedMovie)
    const isFavorite = favorites.find((el) => el.id === selectedMovie.id);
    const similarMovies = useSelector((state: IStoreState) => state.movies.similar)
    const trailers = useSelector((state: IStoreState) => state.movies.trailer)
    const officialTrailer = trailers?.find((el:any) => el.name === "Official Trailer")?.key || trailers.at(0)?.key
    const cast = useSelector((state: IStoreState) => state.movies.cast)
    const imagePath = selectedMovie.backdrop_path || selectedMovie.poster_path
    const loading = useSelector((state: IStoreState) => state.movies.isLoadingCast)
    const language = useSelector((state: IStoreState) => state.movies.language)
    useEffect(() => {
        dispatch(loadSelectedMovie(movieId, language))
        dispatch(loadSimilarMovies(movieId, language))
        dispatch(loadTrailer(movieId, language))
        dispatch(loadCast(movieId))
    }, [movieId, language])
    return (
        <section className="selected-movie">
            <div className="selected-movie__container">
                <div className= 'selected-movie__poster-block-background-animation'>
                <div className="selected-movie__poster-block"
                    style={{ background: imagePath ? `url(https://image.tmdb.org/t/p/w1280/${imagePath}) 0 0/cover no-repeat` : 'url(https://img.freepik.com/free-photo/assortment-cinema-elements-red-background-with-copy-space_23-2148457848.jpg?w=1380&t=st=1687249554~exp=1687250154~hmac=807af9d01ed6a2d8cde9d8824817dc62708e379668513b599a7c02ad1ec1d184) 0 0/cover no-repeat' }}
                >
                        <div className="selected-movie__poster-block-background">
                            <div className="selected-movie__poster-info">
                                <NavLink className="selected-movie__back-to-home" to='/movies-page/'> {language === 'ru-RU' ? "Вернуться на главную" : "Back to home"}</ NavLink>
                                <span className="selected-movie__poster-date">{selectedMovie.release_date}</span>
                                <h2 className="selected-movie__poster-tittle">{selectedMovie.title}</h2>
                                <button className={isFavorite ? "selected-movie__add-to-favorites-clicked" : "selected-movie__add-to-favorites"}
                                    onClick={() => dispatch(toggleFavorite(selectedMovie as unknown as IMovie))}
                                >
                                    {
                                        !isFavorite ?
                                            language === 'ru-RU' ? "Добавить в избранное" : "Add to favorites" :
                                            language === 'ru-RU' ? "Фильм в избранном" : "Added to favorites"
                                    }
                                </button>
                            </div>
                    </div>
                </div>
                </div>
                <div className="selected-movie__description-block">
                    <div className="selected-movie__description-info">
                        <div className="selected-movie__genres">
                            <span style={{ fontWeight: '600', color: '#F4A900' }}>{language === 'ru-RU' ? "Жанры" : "Genres"}:</span>
                            {
                                selectedMovie.genres?.map((genre, index) => <span key={index}> {genre.name}, </span>)
                            }
                        </div>
                        <div>
                            <span style={{ fontWeight: '600', color: '#F4A900' }}>{language === 'ru-RU' ? "Сюжет:" : "Plot:"} </span>
                            <span className="selected-movie__plot"> {selectedMovie.overview}</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: '600', color: '#F4A900' }}>{language === 'ru-RU' ? "Бюджет:" : "Budget:"} </span>
                            <span className="selected-movie__budget"> {selectedMovie.budget?.toLocaleString()} $</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <span style={{ fontWeight: '600', color: '#F4A900' }}>{language === 'ru-RU' ? "рейтинг:" : "Rate:"}</span>
                            <div className="selected-movie__rating"
                                style={{
                                    border: selectedMovie.vote_average > 7 ? '4px solid #03C03C' :
                                        selectedMovie.vote_average < 6 ? '4px solid #D2122E' :
                                            '4px solid #FEBE10'
                                }}>
                                {
                                    Number.isInteger(selectedMovie.vote_average) ? selectedMovie.vote_average.toFixed(1) :
                                        selectedMovie.vote_average?.toFixed(1)}
                            </div>
                        </div>
                    </div>
                    <div className="selected-movie__trailer">
                        <Iframe url={`https://www.youtube.com/embed/${officialTrailer ? officialTrailer: 'sY2djp46FeY'}`}
                        />
                    </div>
                </div>
                <h3 style={{ color: '#f4a900' }}>{language === 'ru-RU' ? "Актёрский состав:" : "Cast:"}</h3>
                <div className="selected-movie__similar-movies">
                    {
                        !loading ?
                            cast.map((actor, id) => <ActorCard actorInfo={actor} index={id} key={id} />) :
                            cast.map((actor, id) => <Loader key={id} />)
                    }
                </div>
                <h3 style={{ color: '#f4a900' }}>{language === 'ru-RU' ? "Похожие фильмы:" : "Similar movies:"}</h3>
                <div className="selected-movie__similar-movies">
                    {
                        similarMovies.map((movie, id) => <Movie movieInfo={movie} index={id} key={id} />)
                    }
                </div>

            </div>
        </section>
    )
}

export default SelectedMovie