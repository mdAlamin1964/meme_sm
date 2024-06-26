export default function new_post({upload_url, file_check}) {
   return (
        <>
            <div className="new-post-module mt-4">
                <div className="new-post-title">
                    <p className="title-1">Create a new Post!</p>
                </div>
                <form action={upload_url} className="new-post-form mt-0" method="POST" enctype="multipart/form-data">
                    <input onChange={file_check()} required name="file" className="input-upload my-1" type="file" id="user-post-file" accept=".jpg, .jpeg, .png"/>
                    <textarea name="description" className="input-dft m-1" id="user-post-description" placeholder="Description"></textarea>
                    <button className="secondery-btn mt-1 pointer" type="submit">Post</button>
                </form>
            </div>
        </>
    )
}