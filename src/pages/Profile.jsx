export default function profile({newPost, userData,userImage, user_all_post, show_pop_handle, log_user_out}) {
    return (
        <>
            <div className="user-profile py-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="user-image">
                                <img src={userImage} alt="" />
                               
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="user-info">
                                <h2>{userData.fullName}</h2>
                                <p className="user-name">@{userData.userName}</p>
                                <h4>{userData.bDay}</h4>
                                <h6>join since: {userData.joinDate}</h6>
                            </div>
                            <a className="pointer" onClick={show_pop_handle()}>
                                    <button className="secondery-btn mt-2">Update Profile</button>
                                </a>
                                <a className="pointer" onClick={log_user_out()}>
                                <button className="secondery-btn mt-2 user-logout-btn">logout</button>
                                </a>
                        </div>
                    </div>

                    {newPost}

                    <div className="user-all-post mt-4">
                        <ul className="user_all_post_ul">
                            {user_all_post}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}