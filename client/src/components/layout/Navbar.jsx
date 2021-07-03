import React, { useContext, useEffect } from 'react'
import { NavLink, Link, useHistory } from 'react-router-dom'

import { logout } from '../../actions/authActions'

import { AuthContext } from '../../contexts/AuthContext'

const Navbar = (props) => {
    const history = useHistory()
    const { isAuthenticated, dispatch } = useContext(AuthContext)

    const handleActiveLink = e => {
        console.log('TARGET: ', e.target)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active')
        })
        
        e.target.addEventListener('click', function (e) {
            e.target.classList += ' active'
        })
    }

    useEffect(() => {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active')
        })
    }, [])
    

    return(
        <nav className="br-3">
            <Link className='brand' to='/' >+pr<span className="red-txt">ze+</span></Link>

            { !isAuthenticated ? (
                <div className="nav">
                    <NavLink onClick={handleActiveLink} className='btn btn-light-outline mb-2' to='/login'>login</NavLink>
                    <NavLink onClick={handleActiveLink} className='btn' to='/register'>register</NavLink>
                </div>

            ) : (
                <React.Fragment>
                    <div className="nav">
                        <NavLink onClick={handleActiveLink} to='/' className='nav-link'>
                            <i className="lnr lnr-home"></i>
                            <span className="nav-link-txt">Home</span>
                        </NavLink>

                        <NavLink onClick={handleActiveLink} to='/subscriptions' className='nav-link'>
                            <i className="lnr lnr-pushpin"></i>
                            <span className="nav-link-txt">Subscriptions</span>
                        </NavLink>

                        <NavLink onClick={handleActiveLink} to='/bookmarks' className='nav-link'>
                            <i className="lnr lnr-bookmark"></i>
                            <span className="nav-link-txt">Bookmarks</span>
                        </NavLink>

                        <NavLink onClick={handleActiveLink} to='/chats' className='nav-link'>
                            <i className="lnr lnr-bubble"></i>
                            <span className="nav-link-txt">Chats</span>
                        </NavLink>

                        <NavLink onClick={handleActiveLink} to='/dashboard' className='nav-link'>
                            <i className="lnr lnr-chart-bars"></i>
                            <span className="nav-link-txt">Dashboard</span>
                        </NavLink>                        
                        
                        <NavLink onClick={handleActiveLink} to='/settings' className='nav-link'>
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