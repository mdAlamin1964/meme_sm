export default function public_profile({userData,userImage, user_all_post}) {
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
                        </div>
                    </div>

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