import { useSelector } from "react-redux";
import { IStoreState} from "../../types"
import './user-box.css'

const UserBox = () => {
    const currentUser = useSelector((state: IStoreState) => state.user.user);
    const isAuthorized = !!currentUser?.id;
    const userName = useSelector(
        (state: IStoreState) => state.user.user.username
    );
    return (
        <div className='user-box'>
            {
                isAuthorized?
                <div className='user-logo'>
                {userName ? userName[0].toUpperCase() : ''}
                </div>:
                <div className='user-logo'>
                ?
                </div>
            }
            
            <p className="user-name">{isAuthorized? userName : 'Вход не выполнен'}</p>
        </div>
    )
}


export default UserBox