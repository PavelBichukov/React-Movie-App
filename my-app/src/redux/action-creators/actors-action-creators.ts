import { IActor, IActorPhoto, IMovie, IMoviesList, IResponse } from "../../types";
import { SET_ACTOR_INFO, LOAD_ACTOR_INFO, SET_ACTOR_FILMOGRAPHY, LOAD_ACTOR_FILMOGRAPHY, SET_ACTOR_PHOTOS, LOAD_ACTOR_PHOTOS} from "../action-types";
import { takeEvery, put } from "redux-saga/effects";
import { API_URL, API_KEY_3, API_KEY_4 } from '../../api/api';


const setActorInfo = (actorInfo: IActor) => ({
    type: SET_ACTOR_INFO,
    actorInfo
})

const loadActorInfo = (id: string, language: string) => ({
    type: LOAD_ACTOR_INFO,
    id,
    language
})

const setActorFilmography = (movies: IMoviesList) => ({
    type: SET_ACTOR_FILMOGRAPHY,
    movies
})

const loadActorFilmography = (id: string, language: string) => ({
    type: LOAD_ACTOR_FILMOGRAPHY,
    id,
    language
})

const setActorPhotos = (photos:IActorPhoto[]) => ({
    type: SET_ACTOR_PHOTOS,
    photos
})

const loadActorPhotos= (id: string) => ({
    type: LOAD_ACTOR_PHOTOS,
    id
})



function* fetchActorInfo (action: any) {
    const { id, language } = action;
    const resp: Response = yield fetch(`${API_URL}/person/${id}?language=${language}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_4}`,
        },
    });
    const data: IActor = yield resp.json();
    yield put(setActorInfo(data))
}

function* fetchActorFilmography (action: any) {
    const { id, language  } = action;
    const resp: Response = yield fetch(`${API_URL}/person/${id}/credits?language=${language}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_4}`,
        },
    });
    const data: IResponse = yield resp.json();
    const movies = data.cast.length > 30 ? data.cast.slice(0,28) : data.cast
    yield put(setActorFilmography(movies))
}

function* fetchActorPhotos (action: any) {
    const { id } = action;
    const resp: Response = yield fetch(`${API_URL}/person/${id}/images`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_4}`,
        },
    });
    const data: IResponse = yield resp.json();
    yield put(setActorPhotos(data.profiles))
}


function* watcherActors() {
    yield takeEvery(LOAD_ACTOR_INFO, fetchActorInfo)
    yield takeEvery(LOAD_ACTOR_FILMOGRAPHY, fetchActorFilmography)
    yield takeEvery(LOAD_ACTOR_PHOTOS, fetchActorPhotos)
}


export {
    watcherActors,
    setActorInfo,
    loadActorInfo,
    loadActorFilmography,
    loadActorPhotos
}