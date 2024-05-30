export default function user_box({user_id, user_name, user_image, btn, handle_btn, handle_image}) {
    return (
        <>
            <div className={`user-box-module mb-md-3`} >
                <div className="user-name-image">
                    <div className="user-image" onClick={handle_image()}>
                        <img className='' src={user_image} alt="" />
                    </div>
                    <div className="user-info">
                        <p className='user-id'>{user_name}</p>
                        <p className="user-name">@{user_id}</p>
                    </div>
                </div>
                <div className="user-switch-link pointer">
                        <a className="default-btn" onClick={handle_btn()}>{btn}</a>
                </div>
            </div>
        </>
    )
}