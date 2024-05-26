export default function login_module({handle_register, handle_try}) {
    return (
        <>  
                <div className="login-module">
                    <div className="login-title">
                        <p>Login to your account</p>
                    </div>
                    <form action="http://localhost:5000/login" className="login-form mt-2" method="POST">
                        <input name="user" className="input-dft" type="text" id="login-user" placeholder="username" autoComplete="off" required/>
                        <input name="password" className="input-dft mt-1" type="password" id="login-pass" placeholder="password" required/>

                        <button onClick={handle_try()} className="secondery-btn mt-1" type="submit">Login</button>
                    </form>
                    <p className="register mt-2">
                        Do not have account <a onClick={handle_register()} className="default-btn pointer">Register now!</a>
                    </p>
                </div>
        </>
    )
}