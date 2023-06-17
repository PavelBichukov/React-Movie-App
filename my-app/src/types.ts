export interface IMovie {
    "adult": boolean,
    "backdrop_path": string,
    "genre_ids": number[]
    "id": number,
    "original_language": string,
    "original_title": string,
    "overview": string,
    "popularity": number,
    "poster_path": string,
    "release_date": string,
    "title": string,
    "video": boolean,
    "vote_average": number,
    "vote_count": number
}

export interface IMovieCast {
    "adult": boolean,
    "gender": number,
    "id": number,
    "known_for_department": string,
    "name": string,
    "original_name": string,
    "popularity": number,
    "profile_path": string,
    "cast_id": number,
    "character": string,
    "credit_id": string,
    "order": number
}

export interface IActor {
    "adult": boolean,
    "also_known_as": string[],
    "biography": string,
    "birthday": string,
    "deathday"?: null,
    "gender": number,
    "homepage"?: null,
    "id": number,
    "imdb_id": string,
    "known_for_department": string,
    "name": string,
    "place_of_birth": string,
    "popularity": number,
    "profile_path": string
}

export interface ISelectedMovie {
    "adult": boolean,
    "backdrop_path": string,
    "belongs_to_collection": {
        "id": number,
        "name": string,
        "poster_path": string,
        "backdrop_path": string
    },
    "budget": number,
    "genres": any[],
    "homepage": string,
    "id": number,
    "imdb_id": string,
    "original_language": string,
    "original_title": string,
    "overview": string,
    "popularity": number,
    "poster_path": string,
    "production_companies": any[],
    "production_countries": any[],
    "release_date": string,
    "revenue": number,
    "runtime": number,
    "spoken_languages": any[],
    "status": string,
    "tagline": string,
    "title": string,
    "video": boolean,
    "vote_average": number,
    "vote_count": number
}

export interface IResponse {
    results: any,
    cast: any,
    profiles: any
}


export interface IActorPhoto {
    "aspect_ratio": number,
    "height": number,
    "iso_639_1": null,
    "file_path": string,
    "vote_average"?: number,
    "vote_count"?: number,
    "width"?: number
}

export interface IMovieProps {
    movieInfo: IMovie,
    index: number | string | any
}

export interface IActorProps {
    actorInfo: IMovieCast,
    index: number | string | any
}

export interface IUser {
    username?: string,
    password: string,
    email: string,
    id?: number,
}

export interface IUserState {
    user: IUser,
    favorites: IMovie[],
}

export interface IActivation {
    uid: string,
    token: string,
}

export interface ITokens {
    access: string,
    refresh: string,
}

export interface IBurger {
    active: boolean,
    callback: Function
}


export interface IMoviesList {
    movies: IMovie[]
}

export interface IMoviesState {
    movies: IMovie[],
    selectedMovie: ISelectedMovie,
    sort: string,
    year: number,
    genres: string[],
    similar: IMovie[],
    trailer: string,
    currentPage: number,
    searchValue: string,
    searchResults: IMovie[],
    cast: IMovieCast[],
    isLoading: boolean,
    isLoadingCast: boolean
}

export interface IActorsState {
    movies: IMovie[],
    actorInfo: IActor,
    photos: IActorPhoto[]
}

export interface IMoviesDisplay {
    currentPage: number,
    sortParams: string
}


export interface IStoreState {
    movies: IMoviesState,
    actors: IActorsState,
    user: IUserState
}