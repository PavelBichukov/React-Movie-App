import { SET_MOVIES, LOAD_MOVIES, SET_SELECTED_MOVIE, LOAD_SELECTED_MOVIE, SET_SORT, SET_CURRENT_PAGE, SET_GENRES, LOAD_SIMILAR_MOVIES, SET_SIMILAR_MOVIES, SET_MOVIE_TRAILER, LOAD_MOVIE_TRAILER, LOAD_SEARCH_RESULTS, SET_SEARCH_RESULTS, LOAD_CAST, SET_CAST, SET_LOADING, SET_LOADING_CAST } from '../action-types'
import { IMovie, IMovieCast, IMoviesDisplay, IMoviesList, IResponse, ISelectedMovie } from '../../types'
import { takeEvery, put } from "redux-saga/effects";
import { API_URL, API_KEY_3, API_KEY_4 } from '../../api/api';


const setMovies = (movies: IMoviesList) => ({
    type: SET_MOVIES,
    movies
});

const loadMovies = (moviesDisplay: IMoviesDisplay, genres: string[]) => ({
    type: LOAD_MOVIES,
    moviesDisplay,
    genres
})

const setSorting = (sortParams: string) => ({
    type: SET_SORT,
    sortParams
})

const setCurrentPage = (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

const setGenres = (genres: []) => ({
    type: SET_GENRES,
    genres
})

const loadSelectedMovie = (id: string) => ({
    type: LOAD_SELECTED_MOVIE,
    id,
})

const setSelectedMovie = (movie: ISelectedMovie) => ({
    type: SET_SELECTED_MOVIE,
    movie,
})

const loadSimilarMovies = (id: string) => ({
    type: LOAD_SIMILAR_MOVIES,
    id,
})

const setSimilarMovies = (similar: IMoviesList) => ({
    type: SET_SIMILAR_MOVIES,
    similar,
})

const setTrailer = (trailer: string) => ({
    type: SET_MOVIE_TRAILER,
    trailer
})

const loadTrailer = (id: string) => ({
    type: LOAD_MOVIE_TRAILER,
    id,
})

const loadSearchResults = (searchValue: string) => ({
    type: LOAD_SEARCH_RESULTS,
    searchValue
})

const setSearchResults = (searchResults: IMoviesList) => ({
    type: SET_SEARCH_RESULTS,
    searchResults
})

const loadCast = (id: string) => ({
    type: LOAD_CAST,
    id
})

const setCast = (cast: IMovieCast[]) => ({
    type: SET_CAST,
    cast
})

const setLoading = (isLoading : boolean) => ({
    type: SET_LOADING,
    isLoading
})

const setLoadingCast = (isLoadingCast : boolean) => ({
    type: SET_LOADING_CAST,
    isLoadingCast
})


function* fetchMovies(action: any) {
    const { currentPage, sortParams } = action.moviesDisplay
    yield put(setLoading(true))
    const genres = '&with_genres=' + action.genres.join(',')
    const resp: Response = yield fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&page=${currentPage}&sort_by=${sortParams}${genres}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data: IResponse = yield resp.json();
    yield put(setMovies(data.results))
    yield put(setLoading(false))
}

function* fetchSelectedMovie(action: any) {
    const { id } = action;
    const resp: Response = yield fetch(`${API_URL}/movie/${id}?language=ru-RU`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_4}`,
        },
    });
    const data: ISelectedMovie = yield resp.json();
    yield put(setSelectedMovie(data))
}

function* fetchSimilarMovies(action: any) {
    const { id } = action;
    const resp: Response = yield fetch(`${API_URL}/movie/${id}/similar?language=ru-RU&page=1`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_4}`,
        },
    });
    const data: IResponse = yield resp.json();
    yield put(setSimilarMovies(data.results))
}

function* fetchMovieTrailer(action: any) {
    const { id } = action;
    const resp: Response = yield fetch(`${API_URL}/movie/${id}/videos?language=en-EN`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_4}`,
        },
    });
    const data: IResponse = yield resp.json();
    yield put(setTrailer(data.results.length? 
        data.results[data.results.length - 1].key || data.results[data.results.length - 2].key || data.results[data.results.length - 3].key || data.results[0].key || data.results[1].key:
        'sY2djp46FeY'
        ))
}

function* fetchCast(action: any) {
    const { id } = action;
    yield put(setLoadingCast(true))
    const resp: Response = yield fetch(`${API_URL}/movie/${id}/credits?language=en-US`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_4}`,
        },
    });
    const data: IResponse = yield resp.json();
    yield put(setCast(data.cast))
    yield put(setLoadingCast(false))
}


function* fetchSearchResults(action: any) {
    const { searchValue } = action;
    const resp: Response = yield fetch(`${API_URL}/search/movie?query=${searchValue}&include_adult=false&language=ru-RU&page=1`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_4}`,
        },
    });
    const data: IResponse = yield resp.json();
    yield put(setSearchResults(data.results))
}







function* watcherMovies() {
    yield takeEvery(LOAD_MOVIES, fetchMovies)
    yield takeEvery(LOAD_SELECTED_MOVIE, fetchSelectedMovie)
    yield takeEvery(LOAD_SIMILAR_MOVIES, fetchSimilarMovies)
    yield takeEvery(LOAD_MOVIE_TRAILER, fetchMovieTrailer)
    yield takeEvery(LOAD_SEARCH_RESULTS, fetchSearchResults)
    yield takeEvery(LOAD_CAST, fetchCast)
}



export {
    setMovies,
    loadMovies,
    watcherMovies,
    setSorting,
    setCurrentPage,
    setGenres,
    loadSelectedMovie,
    loadSimilarMovies,
    setSimilarMovies,
    loadTrailer,
    loadSearchResults,
    loadCast
}