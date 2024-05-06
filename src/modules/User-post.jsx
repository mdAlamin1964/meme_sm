export default function user_post() {
    return (
        <>
            <div className="user-post mb-4">
                <div className="post-heading mb-2">
                    <div className="image-name">
                        <img className="user-post-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ75Q9EvClA_AXpsxkvrXrLRQS6iLAI-Y_MV9FKjZDSEw&s" alt="" />
                        <p className="user-post-id" >mdalamin</p>
                        <p className="user-post-timeago icon-link"><span class="material-symbols-outlined">fiber_manual_record</span><span className="time-number">14</span><span className="time-format">h</span>
                        </p>
                    </div>
                    <div className="post-menus">
                        <p className="icon-link">
                            <span class="material-symbols-outlined">more_horiz</span>
                        </p>
                    </div>
                </div>
                <div className="post-main-image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ75Q9EvClA_AXpsxkvrXrLRQS6iLAI-Y_MV9FKjZDSEw&s" alt="" />
                </div>
                <div className="post-bottom-info">
                    <div className="top my-2">
                        <div className="top-left">
                            <div className="icons">
                                <p className="icon-link">
                                    <span class="material-symbols-outlined">favorite</span>
                                    <span class="material-symbols-outlined">mode_comment</span>
                                    <span class="material-symbols-outlined">send</span>
                                </p>
                            </div>
                        </div>
                        <div className="top-right">
                            <p className="icon-link">
                                <span class="material-symbols-outlined">bookmark</span>
                            </p>
                        </div>
                    </div>
                    <div className="post-description">
                        <div className="post-by">
                            <p>liked by __<span>friends</span> and others</p>
                        </div>
                        <div className="post-details my-2">
                            <p><span className="user-id"><b>__md__alamin</b></span> <span className="post-details-text">I highly recommend you to follow @philrypz & send him a DM with „READY“ to learn how you can build an automated side...</span></p>
                        </div>
                    </div>
                    <div className="post-comment">
                        <div className="comment-text">
                            <form action="#">
                                <input type="text" placeholder="Add a comment..." />
                                <button className="default-btn" type="submit">Post</button>
                            </form>
                        </div>
                        <div className="comment-emoji">
                            <span class="material-symbols-outlined">add_reaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}