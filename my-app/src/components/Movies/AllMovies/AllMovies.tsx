import { useDispatch, useSelector } from 'react-redux'
import { IMovie, IMoviesList, IStoreState } from '../../../types'
import { Movie } from '../Movie'
import { Loader } from '../../Loader'
import './all-movies.css'
import { useEffect, useState } from 'react'
import { loadMovies, setSorting } from '../../../redux/action-creators/movies-action-creators'





const AllMovies = () => {
    const allMovies = useSelector((state: IStoreState) => state.movies.movies)
    const sortParams = useSelector((state: IStoreState) => state.movies.sort)
    const genres = useSelector((state: IStoreState) => state.movies.genres)
    const currentPage = useSelector((state: IStoreState) => state.movies.currentPage)
    const language = useSelector((state: IStoreState) => state.movies.language)
    const loading = useSelector((state: IStoreState) => state.movies.isLoading)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadMovies({currentPage, sortParams}, genres, language)
        )
    }, [currentPage, sortParams, genres, language]);
    return (
        <section className="all-movies">
            <div className="all-movies__container">
                {
                !loading?
                allMovies.map((movie, index) => <Movie key={index} index={movie.id} movieInfo={movie} />):
                allMovies.map((movie, index) =>  <Loader  key={index}/>)
                }
            </div>
        </section>
    )
}

export default AllMovies 