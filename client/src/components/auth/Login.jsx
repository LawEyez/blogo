import { useContext } from "react"
import { Link, useHistory } from 'react-router-dom'

import { login } from "../../actions/authActions"

import { AuthContext } from "../../contexts/AuthContext"
import { ErrorContext } from "../../contexts/ErrorContext"


import useClearErrors from "../../hooks/useClearErrors"
import useFormInput from "../../hooks/useFormInput"

import ErrorTag from "../common/ErrorTag"


const Login = () => {

    // Clear errors once component unmounts.
    useClearErrors()

    // Configure state.
    const email = useFormInput('')
    const password = useFormInput('')

    const { errors, dispatch: errorDispatch } = useContext(ErrorContext)
    const { dispatch: authDispatch } = useContext(AuthContext)

    const history = useHistory()

    // On form submission.
    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            email: email.value,
            password: password.value
        }

        login(data, authDispatch, errorDispatch, history)

    }

    return(
        <div className="auth">
            <h1 className="title">
                <span className="fw-300">+ welcome</span>
                <span className="red-txt"> back +</span>
            </h1>
        
            <form onSubmit={handleSubmit}>
                

                <div className="flx align-start mb-2">
                    <div className="form-group mr-2">
                        <input className={errors && errors.email ? 'border-red' : ''} type="text" placeholder='Enter Email' {...email} />
                        {errors && errors.email && <ErrorTag msg={errors.email} />  }
                    </div>

                    <div className="form-group mr-2">
                        <input className={errors && errors.password ? 'border-red' : ''} type="password" placeholder='Enter Password' {...password} />
                        {errors && errors.password && <ErrorTag msg={errors.password} /> }
                    </div>  
                </div>

                {errors && errors.msg && <ErrorTag msg={errors.msg} />}

                <div className="flx align-center btn-wrapper">
                    <button type='submit' className='btn mr-2'>login</button>
                    <span className="">Don't have an account? <Link to='/register' className='link'>Create Account</Link></span> 
                </div>
            </form>
        </div>
    )
}

export default Login