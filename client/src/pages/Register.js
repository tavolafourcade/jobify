import { useState, useEffect } from "react"
import Wrapper from "../assets/wrappers/RegisterPage"
import { Logo } from "../components"

const initialState = {
        name: '',
        email: '',
        password: '',
        isMember: true
    }

const Register = () => {

    

    const [values, setValues] = useState(initialState)
    // global state and useNavitage
    const handleChange = (e) =>{
        console.log(e.target)
    } 

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
    }

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo/>
                <h3>Login</h3>
                <div className="form-row">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input 
                        type="text" 
                        value={values.name} 
                        name="name"
                        onChange={handleChange}
                        className="form-input">
                    </input>
                </div>
                <button type="submit" className="btn btn-block">
                    Submit
                </button>
            </form>
        </Wrapper>
    )
}

export default Register
