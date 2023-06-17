import { IMovieProps } from "../../../types"
import { NavLink } from 'react-router-dom';
import './searched-movie.css'

const SearchedMovie = ({ movieInfo, index }: IMovieProps) => {
    const { poster_path, vote_average, title, backdrop_path, id } = movieInfo
    const imagePath = poster_path || backdrop_path
    return (
        <div className="searched-movie">
                <div className="searched-movie__poster-image" id={index}
                    style={{ background: imagePath ? `url(https://image.tmdb.org/t/p/w500/${imagePath}) 0 0/cover no-repeat` : '' }}
                >
                </div>
                <NavLink to={`/movies-page/${id}`} className="searched-movie__tittle">{title}</NavLink>
        </div>
    )
}

export default SearchedMovie