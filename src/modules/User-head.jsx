export default function user_head({user_name, user_image, handle_image}) {
    return (
        <>
            <div className="user-head-module pointer" onClick={handle_image()} >
                <img src={user_image} alt="" className="user-head-image mb-2" />
                <p className="user-head-id">{user_name}</p>
            </div>
        </>
    )
}