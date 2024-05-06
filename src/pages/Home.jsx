import React from "react"
import User_post from "../modules/User-post"
export default function home(){

    return(
        <>
            <div className="main-home py-4">
                <User_post />
                <User_post />
            </div>
        </>
    )
}