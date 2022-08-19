import './register-style.scss'
import '../form-style.scss'
import '../../App.scss'



const Register = () => {

    return (
        <div>
            <form>
                <div class="formName">Register</div>
                <input type="text" name="username" placeholder="Username"/>
                <input type="email" name="email" placeholder="Email"/>
                <input type="text" name="firstName" placeholder="First name"/>
                <input type="text" name="lastName" placeholder="Last name"/>
                <input type="email" name="contactNumber" placeholder="Contact number"/>
                <input type="text" name="avatar" placeholder="Avatar"/>
                <input type="text" name="password" placeholder="Password"/>
                <input type="text" name="passwordConfirm" placeholder="Confirm password"/>
                <div class="formButtonsWrapper">

                    <button className="formButton" type="reset">Reset</button>
                    <button className="formButton" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register