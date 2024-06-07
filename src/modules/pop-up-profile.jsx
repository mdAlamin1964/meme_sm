export default function pop_up_profile({proile_image_url, profile_fullName, profile_bDay, profile_join_date, proile_btn_text, proile_btn_url, handle_friend_profile, module_name}){
    return (
        <>
            <div className={`container-fluid p-0 friends-profile ${module_name}`}>
                <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="user-image">
                        <img src={proile_image_url} alt="" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="user-info">
                        <h2>{profile_fullName}</h2>
                        <p className="user-name gray-out-text">Wish me on!</p>
                        <h5>{profile_bDay.slice(0,16)}</h5>
                        <p className="user-name gray-out-text">join since:</p>
                        <h6>{profile_join_date.slice(0,16)}</h6>
                    </div>

                    <a onClick={handle_friend_profile()}>
                        <button className="secondery-btn mt-2 pointer">See full profile</button>
                    </a>
                    <a href={proile_btn_url}>
                        <button className="secondery-btn mt-2 user-logout-btn pointer">{proile_btn_text}</button>
                    </a>
                </div>
                </div>
            </div>
            </>
    )
}