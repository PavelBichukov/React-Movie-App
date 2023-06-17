import './home-page.css'
import { NavLink } from 'react-router-dom';


const HomePage = () => {
    return (
        <section className='home-page'>
            <div className='home-page__background'>
                <div className='home-page__container'>
                    <div className='home-page__posters-container'>
                        <div className='home-page__posters-wrapper'>
                            <div className='home-page__poster1'></div>
                            <div className='home-page__poster2'></div>
                            <div className='home-page__poster3'></div>
                            <div className='home-page__poster4'></div>
                            <div className='home-page__poster5'></div>
                            <div className='home-page__poster6'></div>
                            <div className='home-page__poster7'></div>
                            <div className='home-page__poster8'></div>
                            <div className='home-page__poster9'></div>
                            <div className='home-page__poster10'></div>
                        </div>
                    </div>
                    <div className='home-page__text-block'>
                        <h2 className='home-page__text-block-tittle'>Какой-то заголовок о сайте</h2>
                        <ul className='home-page__text-block-list'>
                            <li className='home-page__text-block-list-item'>Доступ к новинкам мира кинематографа</li>
                            <li className='home-page__text-block-list-item'>Создание своей коллекци избранных фильмов</li>
                            <li className='home-page__text-block-list-item'>Фильмы и мультфильмы любых жанров</li>
                        </ul>
                        <div className='home-page__text-block-get-start'>
                            <span>Для начала использования необходимо войти</span>
                            <span> ↓ </span>
                            <NavLink to = '/sign-in' className='home-page__text-block-button'>Вход</NavLink>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage