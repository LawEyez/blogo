import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Auth components
import Login from './auth/Login'
import Register from './auth/Register'

// Layout components
import Header from './layout/Header'
import Navbar from './layout/Navbar'

// Post components
import WritePost from './posts/WritePost'
import PostDetail from './posts/PostDetail'
import EditPost from './posts/EditPost'
import UserPostsContainer from './posts/UserPostsContainer'

// Common components
import PrivateRoute from './common/PrivateRoute'

// Page components
import Home from './pages/home/Home'

// Sub components
import SubListContainer from './subs/SubListContainer'

// Channel components
import ChannelViewContainer from './channel/ChannelViewContainer'

// Settings components
import SettingsContainer from './settings/SettingsContainer'

import DashboardContainer from './dashboard/DashboardContainer'

import BookmarkListContainer from './bookmarks/BookmarkListContainer'

// Contexts
import SubContextProvider from '../contexts/SubContext'
import SearchResultContainer from './search/SearchResultContainer'


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
                <PrivateRoute exact path='/search/:keyword' component={SearchResultContainer} /> 
                <PrivateRoute exact path='/add-post' component={WritePost} />
                <PrivateRoute exact path='/my-posts' component={UserPostsContainer} />
                <PrivateRoute exact path='/posts/edit/:id' component={EditPost} />
                <PrivateRoute exact path='/settings' component={SettingsContainer} />
                <PrivateRoute exact path='/dashboard' component={DashboardContainer} />
                <PrivateRoute exact path='/bookmarks' component={BookmarkListContainer} />
                

                <SubContextProvider>
                    <Route exact path='/channels/:channelId' component={ChannelViewContainer} />
                    <PrivateRoute exact path='/subscriptions' component={SubListContainer} />
                    <Route exact path='/posts/:id' component={PostDetail} />
                </SubContextProvider>
            </Switch>
        </div>           
    )      
}

export default Main