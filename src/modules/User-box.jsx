export default function user_box({user_id, user_name, user_image}) {
    return (
        <>
            <div className="user-box-module mb-3">
                <div className="user-name-image">
                    <div className="user-image">
                        <img className='' src={user_image} alt="" />
                    </div>
                    <div className="user-info">
                        <p className='user-id'>{user_id}</p>
                        <p className="user-name">{user_name}</p>
                    </div>
                </div>
                <div className="user-switch-link">
                        <a href="#">Switch</a>
                </div>
            </div>
        </>
    )
}