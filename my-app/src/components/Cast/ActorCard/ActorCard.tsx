import { IActorProps} from "../../../types";
import { NavLink } from 'react-router-dom';
import './actor-card.css'


const ActorCard = ({ actorInfo, index }: IActorProps) => {
    const { name, id, profile_path } = actorInfo
    return(
        <div className="actor-card">
            <div className="actor-card__profile-photo"
            style={{ background: profile_path ? `url(https://image.tmdb.org/t/p/w500/${profile_path}) 0 0/contain no-repeat` : '' }}
            >
            </div>
            <NavLink to={`/actors/${id}`} className="actor-card__actor-name">{name}</NavLink>
        </div>
    )
}

export default ActorCard