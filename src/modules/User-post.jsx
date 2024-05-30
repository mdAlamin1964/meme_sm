export default function user_post({post_data, post_image_url, user_image_url, handle_user_btn, handle_like_btn, liked_style, user_like, hide_comment_sac, handle_all_cumment, post_all_comments, comment_text_handle, comment_submit_btn, confrim_delete}) {
   
    return (
        <>  
            <div className="user-post mb-4">
                <div className="post-heading mb-2">
                    <div className="image-name pointer" onClick={handle_user_btn()}>
                        <img className="user-post-image" src={user_image_url} alt="" />
                        <p className="user-post-id" >{post_data.user_name}</p>
                        <p className="user-post-timeago icon-link">
                            <span className="time-format">{String(post_data.date).slice(0,16)}</span>
                        </p>
                    </div>
                    <div className="post-menus">
                        <p className="icon-link">
                            <span class="material-symbols-outlined">horizontal_rule</span>
                        </p>
                    </div>
                </div>
                <div className="post-main-image">
                    <img src={post_image_url} alt="" />
                </div>
                <div className="post-bottom-info">
                    <div className="top my-2">
                        <div className="top-left">
                            <div className="icons">
                                <p className="icon-link">
                                    <a>
                                        <span onClick={handle_like_btn()} class={`material-symbols-outlined ${liked_style}`}>favorite</span>
                                    </a>
                                    <span class="material-symbols-outlined">mode_comment</span>
                                    <span class="material-symbols-outlined">send</span>
                                </p>
                            </div>
                        </div>
                        <div className="top-right">
                            {/* <p className="icon-link">
                                <span class="material-symbols-outlined">bookmark</span>
                            </p> */}
                            <p className="icon-link">
                                <span onClick={confrim_delete()} className="material-symbols-outlined pointer">delete</span>
                            </p>
                        </div>
                    </div>
                    <div className="post-description">
                        <div className="post-by">
                            <p>liked by__ <span className="user_like">{user_like}</span> {post_data.liked_by} others</p>
                        </div>
                        <div className="post-details my-2">
                            <p><span className="user-id"><b>@{post_data.user_name}</b></span> <span className="post-details-text">{post_data.description}</span></p>
                        </div>
                    </div>
                    <div className={`post-comment ${hide_comment_sac}`} >
                        <div className="comment-text">
                            <div className="from-comment">
                                <input onChange={comment_text_handle()} autoComplete="off" required type="text" name="user_comment" placeholder="Add a comment..."  />
                                <button onClick={comment_submit_btn()} className="default-btn" type="submit">Comment</button>
                            </div>
                        </div>
                        <div className="comment-emoji">
                            <span class="material-symbols-outlined">add_reaction</span>
                        </div>
                        <div className="all-comments mt-3">
                            <ul id="all-comments-ul">
                                {post_all_comments}
                            </ul>
                            <button onClick={handle_all_cumment()} className="secondery-btn mt-1">All comments</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}