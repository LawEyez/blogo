import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Link } from 'react-router-dom'
import htmlParser from 'react-html-parser'

import { getSinglePost, deletePost } from "../../actions/postActions"

import { ErrorContext } from "../../contexts/ErrorContext"
import { PostContext } from "../../contexts/PostContext"
import { AuthContext } from "../../contexts/AuthContext"
import { ModalContext } from "../../contexts/ModalContext"

import { isEmpty } from "../../helpers"

import Modal from "../common/Modal"
import Spinner from "../common/Spinner"
import AddComment from "../comments/AddComment"
import CommentList from "../comments/CommentList/CommentList"
import useClearError from "../../hooks/useClearErrors"
import SubActionsContainer from "../subs/SubActionsContainer"
import Social from "../common/Social"
import IconView from "../common/IconView"
import BookmarkControlsContainer from "../bookmarks/BookmarkControlsContainer"

const PostDetail = () => {
    // Clear previous errors
    useClearError()

    // Get post id from params.
    const { id } = useParams()

    // Get history.
    const history = useHistory()

    // Get post from post context.
    const {post, dispatch} = useContext(PostContext)

    // Set up global contexts.
    const { modalOpen, setModalOpen } = useContext(ModalContext)
    const {errors, dispatch: errorDispatch} = useContext(ErrorContext)
    const {user, accessToken} = useContext(AuthContext)
    const { userId } = user

    const [loading, setLoading] = useState(false)

    // Fetch post when component renders.
    useEffect(() => {
        if (userId) {
            getSinglePost(id, userId, dispatch, errorDispatch)
        }
    }, [id, dispatch, errorDispatch, userId])

    useEffect(() => {
        const readCountTimeout = setTimeout(() => {
            (async () => {
                const res = await fetch(`http://localhost:8000/posts/reads/${id}`, {
                    method: 'PATCH'
                })

                const resData = await res.json()
                console.log('READ COUNT REQ: ', resData)
            })()
        }, 20000)

        return () => clearTimeout(readCountTimeout)
        
    }, [id])
    
    return (
        
        <React.Fragment>
            {loading && <Spinner />}

            {modalOpen && <Modal
                title={`Are you sure you want to delete ${post.postData.title.toUpperCase()}?`}
                callAction={() => {deletePost(post.postData._id, accessToken, dispatch, history); setLoading(true)}}
                actionText='Delete'
            />}

            {!isEmpty(post) ? (
                <div className="post-detail">

                    <div className="post-header br-3">
                        <img className='poster' src={post.postData.poster ? post.postData.poster : "/img/poster.jpg"} alt=""/>

                        <div className='post-header-info'>
                            <div className="social-badge flx align-center space-between">
                                <Social />

                                <div className="flx align-center">
                                    <SubActionsContainer channel={post.postData.author._id} />

                                    <Link to={`/channels/${post.postData.author._id}`} className="ml-2">
                                        <div className="badge badge-swatch7 flx align-center">
                                            <span className="badge-txt">{post.postData.author.firstName} {post.postData.author.lastName}</span>

                                            <div className="badge-img ml-1">
                                                {post.postData.author.avatar ? (
                                                    <img src={post.postData.author.avatar} alt="" />
                                                ) : (
                                                    <i className="lnr lnr-user"></i>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
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

                                    <BookmarkControlsContainer />
                                    
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