import React, { useContext } from 'react'
import { NavLink, Link, useHistory } from 'react-router-dom'

import { logout } from '../../actions/authActions'

import { AuthContext } from '../../contexts/AuthContext'

const Navbar = (props) => {
    const history = useHistory()
    const { isAuthenticated, dispatch } = useContext(AuthContext)

    return(
        <nav>
            <Link className='brand' to='/' >+pr<span className="red-txt">ze+</span></Link>

            { !isAuthenticated ? (
                <div className="nav">
                    <NavLink className='btn btn-light-outline mb-2' to='/login'>login</NavLink>
                    <NavLink className='btn' to='/register'>register</NavLink>
                </div>

            ) : (
                <React.Fragment>
                    <div className="nav">
                        <NavLink to='/' className='nav-link'>
                            <i className="lnr lnr-home"></i>
                            <span className="nav-link-txt">Home</span>
                        </NavLink>

                        <NavLink to='/subscriptions' className='nav-link'>
                            <i className="lnr lnr-pushpin"></i>
                            <span className="nav-link-txt">Subscriptions</span>
                        </NavLink>

                        <NavLink to='/' className='nav-link'>
                            <i className="lnr lnr-bookmark"></i>
                            <span className="nav-link-txt">Bookmarks</span>
                        </NavLink>

                        <NavLink to='/' className='nav-link'>
                            <i className="lnr lnr-bubble"></i>
                            <span className="nav-link-txt">Chats</span>
                        </NavLink>

                        <NavLink to='/' className='nav-link'>
                            <i className="lnr lnr-chart-bars"></i>
                            <span className="nav-link-txt">Dashboard</span>
                        </NavLink>                        
                        
                        <NavLink to='/' className='nav-link'>
                            <i className="lnr lnr-cog"></i>
                            <span className="nav-link-txt">Settings</span>
                        </NavLink>                        
                    </div>
                    
                    <div className="nav-footer">
                        <button className='btn' onClick={() => logout(dispatch, history)}>logout</button>
                    </div>
                    
                    
                </React.Fragment>
            ) }
            
        </nav>
    )
}

export default Navbar