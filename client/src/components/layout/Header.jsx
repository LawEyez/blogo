import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

const Header = () => {
    const { user, isAuthenticated } = useContext(AuthContext)

    return (
        <div className="header">
            {isAuthenticated ? (
                <React.Fragment>
                    <form className="search-form flx align-center">
                        <div className="form-group">
                            <input className='' type="text" placeholder='Search'/>
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
                            <span className="badge-txt">{user.name}</span>

                            <div className="badge-img ml-1">
                                <img src="/img/avatar.jpg" alt=""/>
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