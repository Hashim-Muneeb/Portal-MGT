function LoginStd(){
    return(
        <div className="register-container">
            <h1>LOGIN ADMIN PAGE</h1>
            <form>
                <label>Email</label>
                <input type="email" required />

                <label>Password</label>
                <input type="password"  required/>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default LoginStd;