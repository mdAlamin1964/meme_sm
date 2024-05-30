import React from 'react'
export default function right_sidebar({current_user, suggested_friends, heading}) {
    return (
        <>
            <div className="container">
                <div className="right-sidebar-user">
                    {current_user}
                </div>

                <div className="right-sidebar-suggested ">
                    <div className="right-sidebar-suggested-text mb-md-2">
                        <div className="suggested-text">
                            <p>{heading}</p>
                        </div>
                        <div className="suggested-see-all">
                            <a href="#" className='white-link-hover' >See all</a>
                        </div>
                    </div>
                    {/* Suggesten friends */}
                    <div className="friends-line">
                        <ul> 
                            {suggested_friends}
                        </ul>
                    </div>
                    
                </div>
            </div>
        </>
    )
}