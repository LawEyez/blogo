import React, { useContext, useEffect, useState } from "react"

import { ErrorContext } from "../../contexts/ErrorContext"
import { AuthContext } from "../../contexts/AuthContext"

import Avatar from "../common/Avatar"
import ErrorTag from "../common/ErrorTag"
import Spinner from "../common/Spinner"
import { updateUser } from "../../actions/userActions"
import { UserContext } from "../../contexts/UserContext"
import { isEmpty } from "../../helpers"
import useClearError from "../../hooks/useClearErrors"
import { useHistory } from "react-router"

const EditProfile = ({ user, modal }) => {
    const history = useHistory()

    useClearError()

    // Setup state
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [phone, setPhone] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    const [changePassword, setChangePassword] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    // Setup contexts
    const { errors, dispatch: errorDispatch } = useContext(ErrorContext)
    const { dispatch } = useContext(UserContext)
    const { user: authUser, accessToken } = useContext(AuthContext)
    const { userId } = authUser

    // Set initial values of state
    useEffect(() => {
        user.firstName && setFirstName(user.firstName)
        user.lastName && setLastName(user.lastName)
        user.email && setEmail(user.email)
        user.avatar && setAvatar(user.avatar)
        user.username && setUsername(user.username)

    }, [user.firstName, user.lastName, user.email, user.avatar, user.username])

    // Handle form submit
    const handleSubmit = async e => {
        e.preventDefault()

        setSubmitted(true)

        const data = {
            firstName,
            lastName,
            email,
        }

        if (username) data.username = username

        if (avatar) data.avatar = avatar

        if (changePassword) {
            data.changePassword = true
            data.password = password
            data.passwordConfirm = passwordConfirm
        }

        if (phone) data.phone = phone

        const success = await updateUser(userId, data, accessToken, dispatch, errorDispatch, history)

        if (success) {
            modal.toggleModalState(false)
            modal.setIsOpen(false)
        }

    }

    const emptyErrors = () => isEmpty(errors) 

    return (
        <React.Fragment>
            {submitted && emptyErrors() && <Spinner />}
            {user  ? (
                <div className="">
                    <form onSubmit={handleSubmit} className="">
                        <div className="mh-auto max-width-content">
                            <Avatar src={avatar ? avatar : ''} isInput setImage={setAvatar} />
                        </div>

                        <hr className="hr-light mt-2 mb-2" />
                        <h1 className="txt-capitalize fw-300 mb-2 swatch-7">personal information</h1>

                        <div className="flx align-start mb-2">
                            <div className="form-group mr-2">
                                <input
                                    className={errors && errors.firstName ? 'border-red' : ''}
                                    type="text"
                                    placeholder='First Name'
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                                {errors && errors.firstName && <ErrorTag msg={errors.firstName} />  }
                            </div>
                            
                            <div className="form-group">
                                <input
                                    className={errors && errors.lastName ? 'border-red' : ''}
                                    type="text"
                                    placeholder='Last Name'
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                                {errors && errors.lastName && <ErrorTag msg={errors.lastName} />  }
                            </div>
                        </div>

                        <div className="flx align-start mb-2">
                            <div className="form-group mr-2">
                                <input
                                    className={errors && errors.username ? 'border-red' : ''}
                                    type="text"
                                    placeholder='Username'
                                    value={username ? username : ''}
                                    onChange={e => setUsername(e.target.value)}
                                />
                                {errors && errors.username && <ErrorTag msg={errors.username} />  }
                            </div>
                            
                            <div className="form-group">
                                <input
                                    className={errors && errors.email ? 'border-red' : ''}
                                    type="email"
                                    placeholder='Email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                {errors && errors.email && <ErrorTag msg={errors.email} />  }
                            </div>
                        </div>
                        
                        <div className="form-group mb-3">
                            <input
                                className={errors && errors.phone ? 'border-red' : ''}
                                type="text"
                                placeholder='Phone'
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                            {errors && errors.phone && <ErrorTag msg={errors.phone} />  }
                        </div>

                        <hr className="hr-light mb-2" />

                        {changePassword ? (
                            <React.Fragment>
                                <div className="flx align-center justify-between mt-1 mb-2">
                                    <h1 className="txt-capitalize fw-300 swatch-7">change password</h1>
                                    <button 
                                        type="button"
                                        className="btn btn-light-outline"
                                        onClick={() => {
                                            setChangePassword(!changePassword)
                                            setPassword(null)
                                            setPasswordConfirm(null)
                                        }}
                                    >cancel</button>
                                </div>

                                <div className="flx align-start mb-3">
                                    <div className="form-group mr-2">
                                        <input
                                            className={errors && errors.password ? 'border-red' : ''}
                                            type="password"
                                            placeholder='New Password'
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        {errors && errors.password && <ErrorTag msg={errors.password} />  }
                                    </div>

                                    <div className="form-group">
                                        <input
                                            className={errors && errors.passwordConfirm ? 'border-red' : ''}
                                            type="password"
                                            placeholder='Confirm New Password'
                                            value={passwordConfirm}
                                            onChange={e => setPasswordConfirm(e.target.value)}
                                        />
                                        {errors && errors.passwordConfirm && <ErrorTag msg={errors.passwordConfirm} />  }
                                    </div> 
                                </div>

                                <hr className="hr-light mb-2" />
                            </React.Fragment>                      

                        ) : (
                            <button type="button" className="btn btn-light-outline mt-1 mb-2" onClick={() => setChangePassword(!changePassword)} >change password</button>
                        )}

                        <div className="mt-2 mb-2 flx align-center justify-end">
                            <button type="submit" className="btn mr-2">save</button>
                            <button className="btn btn-swatch6" onClick={() => {
                                modal.setIsOpen(false)
                                modal.toggleModalState(false)
                            }}>cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <Spinner />
            )}
        </React.Fragment>
    )
}

export default EditProfile