import React from "react"
function header({user_friends}) {
    return (
        <>
            <div className="main-header py-md-4">
                <ul>
                    {user_friends}
                </ul>
            </div>
        </>
    )
}

export default header;