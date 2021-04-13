import React, { useContext, useEffect } from "react"
import { useParams } from "react-router"
import { Link } from 'react-router-dom'
import htmlParser from 'react-html-parser'

import { getSinglePost } from "../../actions/postActions"

import { ErrorContext } from "../../contexts/ErrorContext"
import { PostContext } from "../../contexts/PostContext"

import { isEmpty } from "../../helpers"
import { AuthContext } from "../../contexts/AuthContext"

const PostDetail = () => {
    // Get post id from params.
    const { id } = useParams()

    // Get post from context.
    const {post, dispatch} = useContext(PostContext)

    const {errors, dispatch: errorDispatch} = useContext(ErrorContext)
    const {user} = useContext(AuthContext)

    console.log(post)

    // Fetch post when component renders.
    useEffect(() => {
        getSinglePost(id, dispatch, errorDispatch)
    }, [id, dispatch, errorDispatch])

    return (
        <React.Fragment>
            {post && !isEmpty(post) ? (
                <div className="post-detail">
                    <div className="post-header">
                        <img className='poster' src="/img/poster.jpg" alt=""/>

                        <div className='post-header-info'>
                            <div className="social-badge flx align-center space-between">
                                <div className="social flx align-center">
                                    <Link className='swatch-1 mr-2'>
                                        <i className="lni lni-facebook-filled"></i>
                                    </Link>
                                    
                                    <Link className='swatch-1 mr-2'>
                                        <i className="lni lni-twitter"></i>
                                    </Link>
                                    
                                    <Link className='swatch-1'>
                                        <i className="lni lni-instagram"></i>
                                    </Link>
                                </div>

                                <div className="flx align-center">
                                    {(post.postData.author._id !== user.userId) && (
                                        <button className="btn btn-light-outline mr-2">subscribe</button>
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

                                            <Link className='flx align-center header-link' to='/my-posts'>
                                                <i className="lnr lnr-trash"></i>
                                                <span className=''>delete post</span>
                                            </Link>

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
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </React.Fragment>
    )
}

export default PostDetail