import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import {watcherMovies} from './action-creators/movies-action-creators';
import {watcherActors} from './action-creators/actors-action-creators';
import {watcherUser } from './action-creators/user-action-creators';
import {moviesReducer, actorsReducer, userReducer} from './reducers';
import { all } from 'redux-saga/effects';


const sagaMiddleware = createSagaMiddleware();

function* rootSaga(){
    yield all([
      watcherMovies(),
      watcherActors(),
      watcherUser(),
    ])
  }

const store = createStore(combineReducers({
    // ui: uiReducer,
    user: userReducer,
    movies: moviesReducer,
    actors: actorsReducer
  }), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
    const currentState = store.getState();
    localStorage.setItem('localState', JSON.stringify(currentState))
})

export default store

sagaMiddleware.run(rootSaga);


