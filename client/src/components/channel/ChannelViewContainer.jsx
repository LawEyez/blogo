import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router"

import { ErrorContext } from "../../contexts/ErrorContext"

import ChannelView from "./ChannelView"
import Spinner from '../common/Spinner'
import { SubContext } from "../../contexts/SubContext"

const ChannelViewContainer = () => {

    // Get channel id from params
    const {channelId} = useParams()

    const [channel, setChannel] = useState(null)
    const [posts, setPosts] = useState(null)
    const {subs} = useContext(SubContext)

    const {dispatch: errorDispatch} = useContext(ErrorContext)

    // Get the channel posts
    const getChannelPosts = useCallback(async () => {

        // Configure request options
        const options = {
            method: 'GET'
        }

        // Make request
        const res = await fetch(`http://localhost:8000/posts/user/${channelId}`, options)

        // Parse response
        const resData = await res.json()

        // Check error
        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })

        } else {
            setPosts(resData.userPosts)
        }

    }, [channelId, errorDispatch])
    

    // Get the channel info
    const getChannelInfo = useCallback(async () => {

        // Configure request options
        const options = {
            method: 'GET'
        }

        // Make request
        const res = await fetch(`http://localhost:8000/users/${channelId}`, options)

        // Parse response
        const resData = await res.json()

        // Check error
        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })

        } else {
            setChannel(resData)
        }

    }, [channelId, errorDispatch])


    // Fetch channel info on render
    useEffect(() => {
        getChannelInfo()
    }, [getChannelInfo, subs])


    // Fetch channel posts on render
    useEffect(() => {
        getChannelPosts()
    }, [getChannelPosts])
    


    console.log('CHANNEL POSTS: ', { posts, channel })

    return (channel && posts ? <ChannelView channel={channel} posts={posts} /> : <Spinner />)
}

export default ChannelViewContainer