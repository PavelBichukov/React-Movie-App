import { put, takeEvery } from "redux-saga/effects";
import { IActivation, IMovie, ITokens, IUser } from '../../types';
import { GET_USER, SET_USER, SIGN_IN, SIGN_UP, SIGN_UP_ACTIVATION, TOGGLE_FAVORITE } from '../action-types'
import { getToken } from "../../utils";




const signUp = (user: IUser) => ({
    type: SIGN_UP,
    user,
})

const signIn = (user: IUser) => ({
    type: SIGN_IN,
    user,
})

const getUser = () => ({
    type: GET_USER,
})

const setUser = (user: IUser) => ({
    type: SET_USER,
    user,
})

const signUpActivation = (activationData: IActivation) => (
    {
        type: SIGN_UP_ACTIVATION,
        activationData
    }
)

const toggleFavorite = (movie: IMovie) => ({
	type: TOGGLE_FAVORITE,
	movie,
});


function* fetchSignUp(action: any) {
    console.log(action.user)
    const resp: Response = yield fetch('https://studapi.teachmeskills.by/auth/users/', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(action.user)
    })
}

function* fetchActivation(action: any) {
    const resp: Response = yield fetch('https://studapi.teachmeskills.by/auth/users/activation/', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(action.activationData)
    })
}


function* fetchSignIn(action: any) {
    const resp: Response = yield fetch('https://studapi.teachmeskills.by/auth/jwt/create/', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(action.user)
    })
    const { access, refresh }: ITokens = yield resp.json();
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    yield put(getUser())
}

function* fetchGetUser() {
    const token: string = yield getToken();
    const resp: Response = yield fetch('https://studapi.teachmeskills.by/auth/users/me', {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    console.log(resp)
    if(resp.status === 200){
        const user: IUser = yield resp.json();
        yield put(setUser(user));
        window.location.pathname = '/movies-page';
    }
    else{
        window.location.pathname = '/sign-in-fail';
    }
}


function* watcherUser() {
    yield takeEvery(SIGN_UP, fetchSignUp)
    yield takeEvery(SIGN_IN, fetchSignIn)
    yield takeEvery(SIGN_UP_ACTIVATION, fetchActivation)
    yield takeEvery(GET_USER, fetchGetUser)
}

export {
    signUp,
    signIn,
    watcherUser,
    signUpActivation,
    toggleFavorite,
    setUser
}