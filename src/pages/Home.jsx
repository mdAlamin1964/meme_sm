import React from "react"
export default function home({posts}){

    return(
        <>
            <div className="main-home py-4">
                {posts}
            </div>
        </>
    )
}