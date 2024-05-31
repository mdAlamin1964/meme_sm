export default function user_info_update() {
    return (
        <>  
                <div className="user-info-update-module">
                    <div className="new-post-title my-2">
                    </div>
                    <p className="user-name gray-out-text">Leave blank fields that you don not want to update.</p>
                    <form action="http://localhost:5000/update-userData" className="user-info-update-form mt-2" method="post" enctype="multipart/form-data">
                        <input name="update-name" className="input-dft" type="text" id="user-info-update-name" placeholder="New Full name"  />

                        <p className="mt-2">Change Birthday</p>
                        <input accept=".jpg, .jpeg, .png" name="update-bday" className="input-dft mt-1" type="date" placeholder="B.day" />

                        <p className="mt-2">Change Profile Photo</p>
                        <input type="file" name="update-photo" id="" className="input-dft mt-1" placeholder="fd"/>

                        <button className="secondery-btn mt-1" type="submit">Update your information</button>
                    </form>
                </div>
        </>
    )
}