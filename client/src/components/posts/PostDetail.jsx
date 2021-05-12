import React, { useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { Link } from 'react-router-dom'
import htmlParser from 'react-html-parser'

import { getSinglePost, deletePost } from "../../actions/postActions"
import { deleteSub, postSub } from "../../actions/subActions"

import { ErrorContext } from "../../contexts/ErrorContext"
import { PostContext } from "../../contexts/PostContext"
import { AuthContext } from "../../contexts/AuthContext"
import { SubContext } from "../../contexts/SubContext"
import { ModalContext } from "../../contexts/ModalContext"

import { isEmpty } from "../../helpers"

import Modal from "../common/Modal"
import Spinner from "../common/Spinner"
import AddComment from "../comments/AddComment"
import CommentList from "../comments/CommentList/CommentList"
import useClearError from "../../hooks/useClearErrors"

const PostDetail = () => {
    // Clear previous errors
    useClearError()

    // Get post id from params.
    const { id } = useParams()

    // Get history.
    const history = useHistory()

    // Get post from post context.
    const {post, dispatch} = useContext(PostContext)

    // Get subs from sub context.
    const {subs: _subs} = useContext(SubContext)

    let subs = _subs || []

    // Set up global contexts.
    const { modalOpen, setModalOpen } = useContext(ModalContext)
    const {errors, dispatch: errorDispatch} = useContext(ErrorContext)
    const {user, accessToken} = useContext(AuthContext)
    const { userId } = user

    // Fetch post when component renders.
    useEffect(() => {
        getSinglePost(id, userId, dispatch, errorDispatch)

    }, [id, dispatch, errorDispatch, userId])

    // Check if sub exists
    let hasSub
    let sub

    // Wrap in try-catch as subs might be undefined
    try {
        sub = subs.find(sub => sub.channel === post.postData.author._id)
        hasSub = !isEmpty(sub)

    } catch (error) {
        console.log('YOU FUCKED UP SOMEWHERE')
    }

    console.log('SUBSCRIBED: ', sub, hasSub)

    // Handle subsription attempt.
    const handleSubActions = e => {
        if (e.target.value === 'sub') {
            const data = {
                subscriber: user.userId,
                channel: post.postData.author._id
            }
    
            postSub(data, accessToken, errorDispatch)

        } else {
            deleteSub(sub._id, accessToken, errorDispatch)
        }
    }

    return (
        
        <React.Fragment>
            
            {modalOpen && <Modal
                title={`Are you sure you want to delete ${post.postData.title.toUpperCase()}?`}
                callAction={() => deletePost(post.postData._id, accessToken, dispatch, history)}
                actionText='Delete'
            />}

            {post && !isEmpty(post) ? (
                <div className="post-detail">

                    <div className="post-header">
                        <img className='poster' src="/img/poster.jpg" alt=""/>

                        <div className='post-header-info'>
                            <div className="social-badge flx align-center space-between">
                                <div className="social flx align-center">
                                    <Link to='/' className='swatch-1 mr-2'>
                                        <i className="lni lni-facebook-filled"></i>
                                    </Link>
                                    
                                    <Link to='/' className='swatch-1 mr-2'>
                                        <i className="lni lni-twitter"></i>
                                    </Link>
                                    
                                    <Link to='/' className='swatch-1'>
                                        <i className="lni lni-instagram"></i>
                                    </Link>
                                </div>

                                <div className="flx align-center">
                                    {!isEmpty(user) && (post.postData.author._id !== user.userId) && !hasSub && (
                                        <button className="btn btn-light-outline mr-2" value='sub' onClick={handleSubActions}>subscribe</button>
                                    )}
                                    
                                    {!isEmpty(user) && (post.postData.author._id !== user.userId) && hasSub && (
                                        <button className="btn btn-light mr-2" value='unsub' onClick={handleSubActions}>unsubscribe</button>
                                    )}

                                    <div className="badge badge-swatch7 flx align-center">
                                        <span className="badge-txt">{post.postData.author.firstName} {post.postData.author.lastName}</span>

                                        <div className="badge-img ml-1">
                                            <img src="/img/avatar.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="title-date">
                                <h1>{post.postData.title}</h1>

                                <div className="flx align-center">
                                    { post.postData.author._id === user.userId && (
                                        <div className="header-nav flx align-center">
                                            <Link className='flx align-center header-link' to={`/posts/edit/${post.postData._id}`}>
                                                <i className="lnr lnr-pencil"></i>
                                                <span className=''>edit Post</span>
                                            </Link>

                                            <button className='flx align-center header-link' onClick={() => setModalOpen(true)}>
                                                <i className="lnr lnr-trash"></i>
                                                <span className=''>delete post</span>
                                            </button>

                                            {post.postData.isDraft && <button className="btn">publish</button>}
                                            
                                        </div>
                                    )}
                                    
                                    <p className='date-txt'>{new Date(post.postData.publishDate).toDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="post-content">
                        <div className="post-body">
                            {htmlParser(post.postData.body)}
                        </div>

                        <AddComment postId={post.postData._id} />

                        <div className="mt-3 flx justify-center">
                            {post.comments.length > 0 ? <CommentList comments={post.comments} /> : <h1>No comments yet. Be the first to share your thoughts.</h1> }
                        </div>
                    </div>
                </div>

            ) : (
                <Spinner />
            )}

            
        </React.Fragment>
        
    )
}

export default PostDetail