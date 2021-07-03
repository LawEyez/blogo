import React, { useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { UserContext } from "../../contexts/UserContext"

const Header = () => {
    const { isAuthenticated } = useContext(AuthContext)
    const { user } = useContext(UserContext)
    const history = useHistory()

    const [keyword, setKeyword] = useState('')

    const handleSearchSubmit = (e) => {
        e.preventDefault()

        history.push(`/search/${keyword}`)
    }

    return (
        <div className="header">
            {isAuthenticated ? (
                <React.Fragment>
                    <form onSubmit={handleSearchSubmit} className="search-form flx align-center">
                        <div className="form-group">
                            <input className='' type="text" placeholder='Search' value={keyword} onChange={e => setKeyword(e.target.value)} />

                            <button type='submit' className='btn ml-1'>
                                <i className="lnr lnr-magnifier"></i>
                            </button>
                        </div>
                    </form>

                    <div className="flx align-center">
                        <div className="header-nav flx align-center">
                            <Link className='flx align-center header-link' to='/add-post'>
                                <i className="lnr lnr-file-add"></i>
                                <span className=''>Add Post</span>
                            </Link>

                            <Link className='flx align-center header-link' to='/my-posts'>
                                <i className="lnr lnr-layers"></i>
                                <span className=''>my posts</span>
                            </Link>
                            
                        </div>

                        <div className="badge flx align-center">
                            <span className="badge-txt">{user.firstName} {user.lastName}</span>

                            <div className="badge-img ml-1">
                                {user.avatar ? (
                                    <img src={user.avatar} alt=""/>
                                ) : (
                                    <i className="lnr lnr-user"></i>
                                )}
                            </div>
                        </div>
                    </div>  
                </React.Fragment>
            ) : (
                <Link to='/' className='logo txt-lg fw-800 ls-1 txt-end'>
                    <span className="swatch-1">+PR</span>
                    <span className="red-txt">ZE+</span>
                </Link>
            )}
            
        </div>
    )
}

export default Header