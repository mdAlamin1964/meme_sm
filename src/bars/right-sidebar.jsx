import React from 'react'
import User_box from '../modules/User-box'
export default function right_sidebar() {
    return (
        <>
            <div className="container">
                <div className="right-sidebar-user">
                    <User_box />
                </div>

                <div className="right-sidebar-suggested mt-4 ">
                    <div className="right-sidebar-suggested-text mb-2">
                        <div className="suggested-text">
                            <p>Suggested to you</p>
                        </div>
                        <div className="suggested-see-all">
                            <a href="#" className='white-link-hover' >See all</a>
                        </div>
                    </div>
                    
                    <User_box />
                    <User_box />
                    <User_box />
                    <User_box />
                </div>
            </div>
        </>
    )
}