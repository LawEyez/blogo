import { useContext } from "react"
import { Link, useHistory, Redirect } from "react-router-dom"

import { register } from "../../actions/authActions"
import { AuthContext } from "../../contexts/AuthContext"

import { ErrorContext } from "../../contexts/ErrorContext"

import useClearErrors from "../../hooks/useClearErrors"
import useFormInput from "../../hooks/useFormInput"

import ErrorTag from "../common/ErrorTag"


const Register = () => {

    // Clear errors once component unmounts.
    useClearErrors()

    // Configure state.
    
    const firstName = useFormInput('')
    const lastName = useFormInput('')
    const email = useFormInput('')
    const password = useFormInput('')
    const passwordConfirm = useFormInput('')

    // Error handling.
    const { errors, dispatch: errorDispatch } = useContext(ErrorContext)

    const { isAuthenticated } = useContext(AuthContext)

    const history = useHistory()

    // On form submission.
    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value
        }

        register(data, errorDispatch, history)
    }

    // Redirect to homepage if user is authenticated.
    if (isAuthenticated) {
        return <Redirect to='/' />
    }


    return(
        <div className="auth">
            <h1 className="title">
                <span className="fw-300">+ get</span>
                <span className="red-txt"> started +</span>
            </h1>
            
            <form onSubmit={handleSubmit}>
                <div className="flx align-start mb-2">
                    <div className="form-group mr-2">
                        <input className={errors && errors.firstName ? 'border-red' : ''} type="text" placeholder='First Name' {...firstName} />
                        {errors && errors.firstName && <ErrorTag msg={errors.firstName} />  }
                    </div>

                    <div className="form-group mr-2">
                        <input className={errors && errors.lastName ? 'border-red' : ''} type="text" placeholder='Last Name' {...lastName} />
                        {errors && errors.lastName && <ErrorTag msg={errors.lastName} /> }
                    </div>  
                </div>

                <div className="form-group mb-2">
                    <input className={errors && errors.email ? 'border-red' : ''} type="text" placeholder='Email' {...email} />
                    {errors && errors.email && <ErrorTag msg={errors.email} />  }
                </div>

                <div className="flx align-start mb-3">
                    <div className="form-group mr-2">
                        <input className={errors && errors.password ? 'border-red' : ''} type="password" placeholder='Set Password' {...password} />
                        {errors && errors.password && <ErrorTag msg={errors.password} /> }
                    </div>

                    <div className="form-group mr-2">
                        <input className={errors && errors.passwordConfirm ? 'border-red' : ''} type="password" placeholder='Confirm Password' {...passwordConfirm} />
                        {errors && errors.passwordConfirm && <ErrorTag msg={errors.passwordConfirm} /> }
                    </div> 
                </div>

                <div className="flx align-center btn-wrapper">
                    <button type='submit' className='btn mr-2'>create account</button>
                    <span className="">Already have an account? <Link to='/login' className='link'>Login</Link></span> 
                </div>
            </form>
        </div>
    )
}

export default Register