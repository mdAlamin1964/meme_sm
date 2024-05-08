import React from "react"
import User_head from "../modules/User-head";
function header({user_friends}) {
    return (
        <>
            <div className="main-header py-4">
                <ul>
                    {user_friends}
                </ul>
            </div>
        </>
    )
}

export default header;