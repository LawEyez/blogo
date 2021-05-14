import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './auth/Login'
import Register from './auth/Register'
import Header from './layout/Header'
import Navbar from './layout/Navbar'
import Home from './pages/home/Home'
import WritePost from './posts/WritePost'
import PrivateRoute from './common/PrivateRoute'
import PostDetail from './posts/PostDetail'
import EditPost from './posts/EditPost'
import UserPostsContainer from './posts/UserPostsContainer'

import SubContextProvider from '../contexts/SubContext'

const Main = () => {

    return(
        <div className='Main'>
            <Navbar />
            <Header />

            <Switch>
                {/* Open Routes */}
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />

                {/* Protected routes. */}
                <PrivateRoute exact path='/add-post' component={WritePost} />
                <PrivateRoute exact path='/my-posts' component={UserPostsContainer} />
                <PrivateRoute exact path='/posts/edit/:id' component={EditPost} />

                <SubContextProvider>
                    <Route exact path='/posts/:id' component={PostDetail} />
                </SubContextProvider>
            </Switch>
        </div>           
    )      
}

export default Main