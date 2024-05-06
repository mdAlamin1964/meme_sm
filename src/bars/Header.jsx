import React from "react"
import User_head from "../modules/User-head";
function header() {
    return (
        <>
            <div className="main-header py-4">
                <ul>
                    <li><User_head /></li>
                    <li><User_head /></li>
                    <li><User_head /></li>
                    <li><User_head /></li>
                    <li><User_head /></li>
                </ul>
            </div>
        </>
    )
}

export default header;