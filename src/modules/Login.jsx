export default function login_module() {
    return (
        <>
            <div className="login-module">
                <div className="login-title">
                    <p>Login to your account</p>
                </div>
                <form action="http://localhost:5000/login" className="login-form mt-2" method="POST">
                    <input name="user" className="input-dft" type="text" id="login-user" placeholder="username" />
                    <input name="password" className="input-dft mt-1" type="password" id="login-pass" placeholder="password" />

                    <button className="secondery-btn mt-1" type="submit">Login</button>
                </form>
            </div>
        </>
    )
}