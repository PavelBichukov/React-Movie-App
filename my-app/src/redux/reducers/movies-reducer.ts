import { IMovie, IMovieCast , IMovieTrailer} from "../../types";
import {
    SET_CURRENT_PAGE, SET_GENRES, SET_MOVIES, SET_SELECTED_MOVIE, SET_SORT, SET_SIMILAR_MOVIES,
    SET_MOVIE_TRAILER, SET_SEARCH_RESULTS, SET_CAST, SET_LOADING, SET_LOADING_CAST, SET_LANGUAGE, SET_TOTAL_PAGES
} from "../action-types";


const initialState = {
    movies: [] as IMovie[],
    sort: 'popularity.desc',
    currentPage: 1,
    totalPages: 0,
    year: '',
    selectedMovie: {},
    genres: [] as string[],
    similar: [] as IMovie[],
    trailer: [] as IMovieTrailer[],
    searchValue: '',
    searchResults: [] as IMovie[],
    cast: [] as IMovieCast[],
    isLoading: false,
    isLoadingCast: false,
    language: 'ru-RU'
}

const moviesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_MOVIES: {
            const { movies } = action;
            return {
                ...state,
                movies
            }
        }
        case SET_LOADING: {
            const { isLoading } = action
            return {
                ...state,
                isLoading
            }
        }
        case SET_LOADING_CAST: {
            const { isLoadingCast } = action
            return {
                ...state,
                isLoadingCast
            }
        }
        case SET_SEARCH_RESULTS: {
            const { searchResults } = action;
            return {
                ...state,
                searchResults
            }
        }
        case SET_SELECTED_MOVIE: {
            const { movie } = action;
            return {
                ...state,
                selectedMovie: movie,
            }
        }
        case SET_MOVIE_TRAILER: {
            const { trailer } = action;
            return {
                ...state,
                trailer
            }
        }
        case SET_SIMILAR_MOVIES: {
            const { similar } = action;
            return {
                ...state,
                similar
            }
        }
        case SET_CAST: {
            const { cast } = action;
            return {
                ...state,
                cast
            }
        }
        case SET_SORT: {
            const { sortParams } = action;
            return {
                ...state,
                sort: sortParams
            }
        }
        case SET_CURRENT_PAGE: {
            const { currentPage } = action;
            return {
                ...state,
                currentPage: currentPage
            }
        }
        case SET_TOTAL_PAGES: {
            const { totalPages } = action;
            return {
                ...state,
                totalPages
            }
        }
        case SET_LANGUAGE: {
            const { language } = action;
            return {
                ...state,
                language
            }
        }
        case SET_GENRES: {
            const { genres } = action;
            const previousState = state.genres.filter((genre) => genre !== genres)
            if (state.genres.includes(genres)) {
                return {
                    ...state,
                    genres: previousState
                }
            } else {
                return {
                    ...state,
                    genres: [...state.genres, genres]
                }
            }
        }
        default: {
            return state;
        }
    }
}




export default moviesReducer