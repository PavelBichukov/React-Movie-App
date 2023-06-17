import React from 'react';
import { Header, SignIn, SignUp, SelectedMovie, ActorPage, SignUpActivation, FavoriteMovies, SignInFail } from './components';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { Provider} from 'react-redux';
import store from './redux/store';
import { MainMoviesPage, HomePage } from './pages';





function App() { 
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <div className="App__background">
          <Header />
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path='sign-in'>
                  <Route index element={<SignIn />} />
                </Route>
                <Route path='sign-in-fail'>
                  <Route index element={<SignInFail/>} />
                </Route>
                <Route path='sign-up'>
                  <Route index element={<SignUp />} />
                </Route>
                <Route path='movies-page'>
                  <Route index element={<MainMoviesPage />} />
                  <Route path=":movieId" element={<SelectedMovie />} />
                </Route>
                <Route path='favorite-movies'>
                  <Route index element={<FavoriteMovies />} />
                </Route>
                <Route path='actors'>
                  <Route index element={<MainMoviesPage />} />
                  <Route path=":actorId" element={<ActorPage />} />
                </Route>
                <Route path="activate/:uid/:token" element={<SignUpActivation />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
