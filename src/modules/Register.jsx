export default function register_module() {
    return (
        <>
            <div className="register-module">
                <div className="register-title">
                    <p>Register a account</p>
                </div>
                <form target="_blank" action="http://localhost:5000/register" className="register-form mt-2" method="post" enctype="multipart/form-data">
                    <input name="register-name" className="input-dft" type="text" id="register-name" placeholder="full name" />
                    <input name="register-user" className="input-dft mt-1" type="text" id="register-user" placeholder="username" />
                    <input name="register-bday" className="input-dft mt-1" type="date" placeholder="B.day" />
                    <input type="file" name="user-photo" id="" className="input-dft mt-1" placeholder="fd"/>
                    <input name="register-pass" className="input-dft mt-1" type="password" id="register-pass" placeholder="password" />
                    <input name="register-pass-confirm" className="input-dft mt-1" type="password" id="register-pass-confirm" placeholder="confirm password" />

                    <button className="secondery-btn mt-1" type="submit">Register</button>
                </form>
            </div>
        </>
    )
}