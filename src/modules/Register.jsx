export default function register_module({handle_register, registerUrl, file_check}) {
    return (
        <>  
                <div className="register-module">
                    <div className="register-title">
                        <p>Register a account</p>
                    </div>
                    <form target="_blank" action={registerUrl} className="register-form mt-2" method="post" enctype="multipart/form-data">
                        <input required name="register-name" className="input-dft" type="text" id="register-name" placeholder="full name"  />
                        <input required name="register-user" className="input-dft mt-1" type="text" id="register-user" placeholder="username" autoComplete="off"/>
                        <input name="register-bday" className="input-dft mt-1" type="date" placeholder="B.day" />
                        <input onChange={file_check()} accept=".jpg, .jpeg, .png" type="file" name="user-photo" id="" className="input-dft mt-1" placeholder="fd"/>
                        <input required name="register-pass" className="input-dft mt-1" type="password" id="register-pass" placeholder="password" />
                        <input required name="register-pass-confirm" className="input-dft mt-1" type="password" id="register-pass-confirm" placeholder="confirm password" />

                        <button className="secondery-btn mt-1" type="submit">Register</button>
                    </form>
                    <p className="login mt-2">
                        Have account <a onClick={handle_register()} className="default-btn pointer">Log in now!</a>
                    </p>
                </div>
        </>
    )
}