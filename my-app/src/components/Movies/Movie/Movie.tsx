import { IMovieProps, IStoreState} from "../../../types"
import { AllMovies } from "../AllMovies"
import { NavLink } from 'react-router-dom';
import './movie.css'
import { Loader } from "../../Loader";
import { useDispatch, useSelector,} from "react-redux";
import { toggleFavorite } from "../../../redux/action-creators/user-action-creators";
import { FavoriteIcon } from "../../Icons/FaforiteIcon";




const Movie = ({ movieInfo, index }: IMovieProps) => {
    const { poster_path, vote_average, title, release_date, backdrop_path, overview, id} = movieInfo
    const imagePath = poster_path || backdrop_path
    const favorites = useSelector((state: IStoreState) => state.user.favorites);
    const isFavorite = favorites.find((el) => el.id === movieInfo.id);
    const dispatch = useDispatch()
    return (
        <div className="movie">
            <div className="movie__poster">
                <div className="movie__poster-poster">
                    <div className="movie__poster-image" id={index}
                        style={{ background: imagePath ? `url(https://image.tmdb.org/t/p/w500/${imagePath}) 0 0/cover no-repeat` : '' }}
                    >
                    </div>
                    <div className="movie__overview">
                        <p>
                            {overview ? overview : 'Описание сюжета отсутсвует'}
                        </p>
                    </div>
                </div>
                <div className="movie__rating"
                    style={{
                        border: vote_average > 7 ? '4px solid #03C03C' :
                            vote_average < 6 ? '4px solid #D2122E' :
                                '4px solid #FEBE10'
                    }}>{
                        Number.isInteger(vote_average) ? vote_average.toFixed(1) :
                        vote_average.toFixed(1)}
                </div>
            </div>
            <NavLink to={`/movies-page/${id}`} className="movie__tittle">{title}</NavLink>
            <span className="movie__year">{release_date}</span>
            <div
					className="movie__favorite-button"
					onClick={() => dispatch(toggleFavorite(movieInfo))}>
					{isFavorite ? (
						<FavoriteIcon className="favorite-active" />
					) : (
						<FavoriteIcon className="favorite" />
					)}
				</div>
        </div>
    )
}



export default Movie