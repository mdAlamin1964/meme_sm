export default function profile({newPost, userData,userImage, user_all_post}) {
    return (
        <>
            <div className="user-profile">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="user-image">
                                <img src={userImage} alt="" />
                                <a href="#">
                                    <button className="secondery-btn mt-2">Upload photo</button>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="user-info">
                                <h2>{userData.fullName}</h2>
                                <h4>{userData.bDay}</h4>
                                <h6>join since: {userData.joinDate}</h6>
                                <a href="http://localhost:5000/logout">
                                <button className="secondery-btn mt-2 user-logout-btn">logout</button>
                                </a>
                            </div>
                            {newPost}
                        </div>
                    </div>
                    <div className="user-all-post mt-4">
                        <ul>
                            {user_all_post}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}