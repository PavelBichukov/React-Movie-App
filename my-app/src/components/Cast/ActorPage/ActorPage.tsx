import { useDispatch, useSelector } from "react-redux"
import { IStoreState } from "../../../types"
import { NavLink, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Movie } from "../../Movies/Movie"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import { loadActorFilmography, loadActorInfo, loadActorPhotos } from "../../../redux/action-creators/actors-action-creators"
import './actor-page.css'


const ActorPage = () => {
    const [biographyDisplay, setFull] = useState(false)
    const { actorId = '' } = useParams()
    const actorInfo = useSelector((state: IStoreState) => state.actors.actorInfo)
    const actorFilmography = useSelector((state: IStoreState) => state.actors.movies)
    const actorPhotos = useSelector((state: IStoreState) => state.actors.photos)
    const language = useSelector((state: IStoreState) => state.movies.language)
    const { biography, name, birthday, profile_path, place_of_birth } = actorInfo
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadActorInfo(actorId, language))
        dispatch(loadActorFilmography(actorId, language))
        dispatch(loadActorPhotos(actorId))
    }, [language])
    return (
        <div className="actor-page">
            <div className="actor-page__container">
                <NavLink className="actor-page__back-to-home" to='/movies-page/'> {language === 'ru-RU' ? "← Вернуться на главную" : "← Back to home"}</ NavLink>
                <div className="actor-page__info">
                    <div className="actor-page__profile-picture-block">
                        <div className="actor-page__profile-picture"
                            style={{ background: profile_path ? `url(https://image.tmdb.org/t/p/w500/${profile_path}) 0 0/cover no-repeat` : '' }}
                        >
                        </div>
                        <h2 className="actor-page__actor-name">{name}</h2>
                        <h4 className="actor-page__actor-birthday">{language === 'ru-RU' ? "Дата рождения:" : "Birth date:"}</h4>
                        {birthday}
                        <h4 className="actor-page__actor-place-of-birth">{language === 'ru-RU' ? "Родился в:" : "Born in:"}</h4>
                        {place_of_birth}
                    </div>
                    <div className="actor-page__about-block">
                        <h4 className="actor-page__actor-tittle">{language === 'ru-RU' ? "Бигорафия:" : "Biography:"}</h4>
                        <p className="actor-page__actor-biography"
                            style={{ overflowY: biographyDisplay ? 'scroll' : 'hidden', maxHeight: biographyDisplay ? '280px' : '' }}
                        >{biography}</p>
                        <button className="actor-page__biography-display"
                            onClick={() => setFull(!biographyDisplay)}
                        >
                            {biographyDisplay ? 
                            language === 'ru-RU' ? "Скрыть" : "Hide": 
                            language === 'ru-RU' ? "Читать ещё" : "Read more"
                            }
                            ❯</button>
                        <h4 className="actor-page__actor-tittle">{language === 'ru-RU' ? "Фото актёра:" : "Actors photos:"}</h4>
                        {
                            actorPhotos.length ?
                                <div className="actor-page__photos-gallery">
                                    <Swiper className="swiper"
                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                        spaceBetween={10}
                                        slidesPerView={1}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 2,
                                            },
                                            768: {
                                                width: 768,
                                                slidesPerView: 5,
                                            },
                                        }}
                                        navigation={{
                                            prevEl: prevRef.current,
                                            nextEl: nextRef.current,
                                        }}
                                        pagination={{ clickable: true }}
                                        scrollbar={{ draggable: true }}
                                    >
                                        {
                                            actorPhotos.map((photo, index) =>
                                                <SwiperSlide className="swiper__slide">
                                                    <div className="actor-page__photos-gallery-item " key={index}
                                                        style={{ background: profile_path ? `url(https://image.tmdb.org/t/p/w500/${photo.file_path}) 0 0/cover no-repeat` : '' }}
                                                    >, </div>
                                                </SwiperSlide>
                                            )
                                        }
                                    </Swiper>
                                    <button className="swiper__button-prev" ref={prevRef}>⟵</button>
                                    <button className="swiper__button-next" ref={nextRef}>⟶</button>
                                </div> :
                                <h2>{language === 'ru-RU' ? "Фотографии отсуствуют..." : "No photos..."}</h2>
                        }

                    </div>
                </div>

                <h2>{language === 'ru-RU' ? "Фильмография:" : "Filmography:"}</h2>
                <div className="actor-page__filmography">
                    {
                        actorFilmography.map((movie, id) => <Movie movieInfo={movie} index={id} key={id} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default ActorPage