import React, { useContext, useEffect } from "react"

import { getUserPosts } from "../../actions/postActions"

import { AuthContext } from "../../contexts/AuthContext"
import { ErrorContext } from "../../contexts/ErrorContext"
import { PostContext } from "../../contexts/PostContext"
import { isEmpty } from "../../helpers"

import Spinner from "../common/Spinner"
import UserPosts from "./UserPosts"

const UserPostsContainer = () => {
    const {user} = useContext(AuthContext)
    const {dispatch, userPosts} = useContext(PostContext)
    const {errors, dispatch: errorDispatch} = useContext(ErrorContext)

    const { userId } = user

    useEffect(() => {
        getUserPosts(userId, dispatch, errorDispatch)
    }, [userId, dispatch, errorDispatch])

    console.log('USER POSTS: ', userPosts, errors)

    return (
        <React.Fragment>
            <h1 className="title"><span className="fw-300">+ my </span><span className="red-txt">posts +</span></h1>
            {/* {errors && errors.msg && <h1>{errors.msg}</h1>} */}
            {!isEmpty(userPosts) ? <UserPosts posts={userPosts}/> : <h1>No posts to show</h1>}
        </React.Fragment>
    )
}

export default UserPostsContainer