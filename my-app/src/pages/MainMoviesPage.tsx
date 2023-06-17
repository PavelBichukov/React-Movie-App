import { SideFiltersBar, AllMovies} from "../components"
import './main-movies-page.css'



const MainMoviesPage = () => {
    return (
        <div className="main-movies-page">
            <div className="main-movies-page__background">
                <div className="main-movies-page__container">
                    <SideFiltersBar />
                    <AllMovies />
                </div>
            </div>
        </div>
    )
}

export default MainMoviesPage