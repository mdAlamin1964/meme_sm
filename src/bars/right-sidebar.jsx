import React from 'react'
import User_box from '../modules/User-box'
export default function right_sidebar({current_user, suggested_friends}) {
    return (
        <>
            <div className="container">
                <div className="right-sidebar-user">
                    {current_user}
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
                    {/* Suggesten friends */}
                    {suggested_friends}
                </div>
            </div>
        </>
    )
}