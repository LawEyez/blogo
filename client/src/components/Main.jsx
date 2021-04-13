import { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Login from './auth/Login'
import Register from './auth/Register'
import Header from './layout/Header'
import Navbar from './layout/Navbar'
import Home from './pages/home/Home'
import WritePost from './posts/WritePost'
import PrivateRoute from './common/PrivateRoute'
import PostDetail from './posts/PostDetail'
import EditPost from './posts/EditPost'

import { AuthContext } from '../contexts/AuthContext'

const Main = () => {
    const { isAuthenticated } = useContext(AuthContext)

    return(
        <div className='Main'>
            <Navbar />
            <Header />

            <Switch>
                <Route exact path='/' component={Home} />

                {/* Protected routes. */}
                <PrivateRoute exact path='/add-post' component={WritePost} />
                <PrivateRoute exact path='/my-posts' component={WritePost} />
                <PrivateRoute exact path='/posts/:id' component={PostDetail} />
                <PrivateRoute exact path='/posts/edit/:id' component={EditPost} />

                {/* Redirect to home if user is authenticated and tries to access login or register page. */}
                { (!isAuthenticated && <Route exact path='/login' component={Login} />) || <Redirect to='/' exact /> }
                { (!isAuthenticated && <Route exact path='/register' component={Register} />) || <Redirect to='/' exact />}
                
            </Switch>
        </div>           
    )      
}

export default Main