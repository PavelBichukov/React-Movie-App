import { SET_USER, TOGGLE_FAVORITE } from "../action-types";
import { IMovie, IUser, IUserState } from "../../types";


const initialState = {
    user: {} as IUser,
    favorites: [] as IMovie[],
}

const getInitialState = () => {
    const localState = localStorage.getItem('localState');
    if (localState) {
        const parsed = JSON.parse(localState);
        const { user } = parsed;
        return user;
    } 
        return initialState;
    
}

const userReducer = (state: IUserState = getInitialState(), action: any) => {
    switch (action.type) {
        case SET_USER: {
            const { user } = action;
            return { ...state, user }
        }
        case TOGGLE_FAVORITE: {
            const { movie } = action;
            const index = state.favorites?.findIndex(el => el.id === movie.id);
            const newFavorites = [...state?.favorites] || []
            if (index === -1) {
                newFavorites.push(movie);
            } else {
                newFavorites.splice(index, 1);
            }
            return {
                ...state,
                favorites: newFavorites,
            }
        }
        default: {
            return state
        }
    }
}

export default userReducer;