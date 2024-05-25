export default function user_own_post({comment_url,post_data, post_image_url, user_image_url, close_post, confrim_delete, handle_like_btn, user_like, liked_style}) {
    return (
        <>
            <div className="user-post user-own-post mb-4">
                <div className="post-heading mb-2">
                    <div className="image-name">
                        <img className="user-post-image" src={user_image_url} alt="" />
                        <p className="user-post-id" >{post_data.user_name}</p>
                        <p className="user-post-timeago icon-link">
                            {/* <span class="material-symbols-outlined"></span>
                            <span className="time-number">14</span> */}
                            <span className="time-format">{post_data.date.slice(0,16)}</span>
                        </p>
                    </div>
                    <div className="post-menus">
                        <p className="icon-link">
                            <span onClick={close_post()}  class="material-symbols-outlined pointer">close</span>
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
                                    <span onClick={handle_like_btn()} class={`${liked_style} material-symbols-outlined`}>favorite</span>
                                    <span class="material-symbols-outlined">mode_comment</span>
                                    <span class="material-symbols-outlined">send</span>
                                </p>
                            </div>
                        </div>
                        <div className="top-right">
                            <p className="icon-link">
                                <span onClick={confrim_delete()} className="material-symbols-outlined pointer">delete</span>
                            </p>
                        </div>
                    </div>
                    <div className="post-description">
                        <div className="post-by">
                            <p>liked by __<span>{post_data.liked_by}</span> and others</p>
                        </div>
                        <div className="post-details my-2">
                            <p><span className="user-id"><b>{post_data.user_name}</b></span> <span className="post-details-text">{post_data.description}</span></p>
                        </div>
                    </div>
                    <div className="post-comment">
                        <div className="comment-text">
                            <form action={comment_url} encType="multipart/form-data" method="POST" >
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