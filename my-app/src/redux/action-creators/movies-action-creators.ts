import { SET_MOVIES, LOAD_MOVIES, SET_SELECTED_MOVIE, LOAD_SELECTED_MOVIE, SET_SORT, SET_CURRENT_PAGE, SET_GENRES, 
LOAD_SIMILAR_MOVIES, SET_SIMILAR_MOVIES, SET_MOVIE_TRAILER, LOAD_MOVIE_TRAILER, LOAD_SEARCH_RESULTS, 
SET_SEARCH_RESULTS, LOAD_CAST, SET_CAST, SET_LOADING, SET_LOADING_CAST, SET_LANGUAGE, SET_TOTAL_PAGES, } from '../action-types'
import { IMovieCast, IMoviesDisplay, IMoviesList, IResponse, ISelectedMovie,} from '../../types'
import { takeEvery, put } from "redux-saga/effects";
import { API_URL, API_KEY_3, API_KEY_4 } from '../../api/api';



const setMovies = (movies: IMoviesList) => ({
    type: SET_MOVIES,
    movies
});

const loadMovies = (moviesDisplay: IMoviesDisplay, genres: string[], language : string) => ({
    type: LOAD_MOVIES,
    moviesDisplay,
    genres,
    language
})

const setSorting = (sortParams: string) => ({
    type: SET_SORT,
    sortParams
})

const setCurrentPage = (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

const setTotalPages = (totalPages: number) => ({
    type: SET_TOTAL_PAGES,
    totalPages
})



const setGenres = (genres: []) => ({
    type: SET_GENRES,
    genres
})

const loadSelectedMovie = (id: string, language : string) => ({
    type: LOAD_SELECTED_MOVIE,
    id,
    language
})

const setSelectedMovie = (movie: ISelectedMovie) => ({
    type: SET_SELECTED_MOVIE,
    movie,
})

const loadSimilarMovies = (id: string, language: string) => ({
    type: LOAD_SIMILAR_MOVIES,
    id,
    language
})

const setSimilarMovies = (similar: IMoviesList) => ({
    type: SET_SIMILAR_MOVIES,
    similar,
})


const setTrailer = (trailer: []) => ({
    type: SET_MOVIE_TRAILER,
    trailer
})


const loadTrailer = (id: string, language: string) => ({
    type: LOAD_MOVIE_TRAILER,
    id,
    language
})

const loadSearchResults = (searchValue: string, language: string) => ({
    type: LOAD_SEARCH_RESULTS,
    searchValue,
    language
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

const setLanguage = (language: string) => ({
    type: SET_LANGUAGE,
    language
})


function* fetchMovies(action: any) {
    const { currentPage, sortParams } = action.moviesDisplay
    const language = action.language
    yield put(setLoading(true))
    const genres = '&with_genres=' + action.genres.join(',')
    const resp: Response = yield fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&language=${language}&page=${currentPage}&sort_by=${sortParams}${genres}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data: IResponse = yield resp.json();
    yield put(setTotalPages(Math.round(data.total_results / 20)))
    yield put(setMovies(data.results))
    yield put(setLoading(false))
}

function* fetchSelectedMovie(action: any) {
    const { id , language} = action;
    const resp: Response = yield fetch(`${API_URL}/movie/${id}?language=${language}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_4}`,
        },
    });
    const data: ISelectedMovie = yield resp.json();
    yield put(setSelectedMovie(data))
}

function* fetchSimilarMovies(action: any) {
    const { id, language } = action;
    const resp: Response = yield fetch(`${API_URL}/movie/${id}/similar?language=${language}&page=1`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_4}`,
        },
    });
    const data: IResponse = yield resp.json();
    yield put(setSimilarMovies(data.results))
}


function* fetchMovieTrailer(action: any) {
    const { id, language} = action;
    const resp: Response = yield fetch(`${API_URL}/movie/${id}/videos?language=${language}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_4}`,
        },
    });
    const data: IResponse = yield resp.json();
    yield put(setTrailer(data.results))
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
    const { searchValue, language } = action;
    const resp: Response = yield fetch(`${API_URL}/search/movie?query=${searchValue}&include_adult=false&language=${language}&page=1`, {
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
    loadCast,
    setLanguage,
}