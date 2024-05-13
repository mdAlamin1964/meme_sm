import React from "react";
export default function left_sidebar() {
    return (
        <>
            <div className="left-sidebar py-4">
                <div className="container p-0">
                    <div className="logo">
                        <img src="./src/assets/logo.png" alt="" />
                    </div>

                    <div className="left-sidebar-menu mt-4">
                        <ul>
                            <li>
                                <a href="#" className="white-link-hover">
                                    <p className="icon-text"><span class="material-symbols-outlined me-1">home</span><span className="left-menu-text active">Home</span></p>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="white-link-hover">
                                    <p className="icon-text"><span class="material-symbols-outlined me-1">image_search</span><span className="left-menu-text">Search</span></p>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="white-link-hover">
                                    <p className="icon-text"><span class="material-symbols-outlined me-1">slideshow</span><span className="left-menu-text">Reels</span></p>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="white-link-hover">
                                    <p className="icon-text"><span class="material-symbols-outlined me-1">mail</span><span className="left-menu-text">Messages</span></p>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="white-link-hover">
                                    <p className="icon-text"><span class="material-symbols-outlined me-1">notifications</span><span className="left-menu-text">Notifications</span></p>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="white-link-hover">
                                    <p className="icon-text"><span class="material-symbols-outlined me-1">account_circle</span><span className="left-menu-text">Profile</span></p>
                                </a>
                            </li>
                            
                        </ul>
                    </div>

                    <div className="left-sidebar-bottom">
                        <ul>
                            <li>
                                <a href="#" className="white-link-hover">
                                    <p className="icon-text"><span class="material-symbols-outlined me-1">menu</span><span className="left-menu-text">More</span></p>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}