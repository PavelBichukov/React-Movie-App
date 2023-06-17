import { SET_ACTOR_INFO, SET_ACTOR_FILMOGRAPHY, SET_ACTOR_PHOTOS } from "../action-types";
import { IActor, IMovie } from "../../types";

const initialState = {
    movies: [] as IMovie[],
    actorInfo: {} as IActor,
    photos: []
}

const moviesReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case SET_ACTOR_INFO: {
            const { actorInfo } = action;
            return {
                ...state,
                actorInfo
            }
        }
        case SET_ACTOR_FILMOGRAPHY: {
            const { movies } = action;
            return {
                ...state,
                movies
            }
        }
        case SET_ACTOR_PHOTOS: {
            const { photos } = action;
            return {
                ...state,
                photos
            }
        }
        default: {
            return state;
        }
    }
}

export default moviesReducer