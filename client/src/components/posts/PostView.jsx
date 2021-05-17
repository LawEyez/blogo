import React from 'react'
import { Link } from 'react-router-dom'

import Badge from "../common/Badge"
import Rating from '../common/Rating'

const PostView = ({ post }) => {
    const content = (
        <React.Fragment>
        <div className="card card-1 mr-2">
            <Badge img={post.author.avatar} txt={`${post.author.firstName} ${post.author.lastName}`}/>

            <img src={'/img/poster.jpg'} className="card-img" alt='Poster' />

            <div className="card-body">
                <div className="flx align-center justify-between">
                    <div className="mr-1">
                        <span className='swatch-2'>{new Date(post.publishDate).toDateString()}</span>
                        <h2 className="">{post.title}</h2>
                    </div>
                    <Link to={`/posts/${post._id}`} className="btn btn-swatch6-outline"><i className="lnr lnr-pointer-up"></i></Link>
                </div>
            </div>
        </div>

        <Link to={`/posts/${post._id}`}>
            <div className="card-2 pd-2 flx flx-col align-center bg-swatch-4 br-2">
                <img src="/img/poster.jpg" alt="" className="square-img mb-2" />

                <div className="card-2-body flx flx-col align-start">
                    <span className='swatch-2 mb-1'>{new Date(post.publishDate).toDateString()}</span>
                    <h1 className="txt-capitalize swatch-1">{post.title}</h1>
                </div>
            </div>
        </Link>

    </React.Fragment>
    )

    return(
        <div className="card-3">
            <img src={post.poster ? post.poster : "/img/poster.jpg"} alt="" className="card-3-img" />

            <div className="card-3-body">
                <div className="top flx align-center justify-between">
                    <Rating />

                    <Link to={`/channels/${post.author._id}`}>
                        <Badge img={post.author.avatar} txt={`${post.author.firstName} ${post.author.lastName}`}/>
                    </Link>
                </div>
                
                <div className="card-3-content">
                    <div className="flx align-center justify-between mb-1 swatch-7">
                        <span className=''>{new Date(post.publishDate).toDateString()}</span>

                        <div className="flx">
                            <i className="lni lni-bookmark mr-1"></i>
                            <i className="lni lni-thumbs-up mr-1"></i>
                            <i className="lni lni-thumbs-down"></i>
                        </div>
                    </div>

                    <Link to={`/posts/${post._id}`}>
                        <h1 className="txt-capitalize swatch-1">{post.title}</h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostView