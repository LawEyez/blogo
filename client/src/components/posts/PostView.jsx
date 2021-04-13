import { Link } from 'react-router-dom'

import Badge from "../common/Badge"

const PostView = ({ post }) => {
    return(
        <div className="card card-1 mr-2">
            <Badge img={post.author.avatar} txt={`${post.author.firstName} ${post.author.lastName}`}/>

            <img src='/img/poster.jpg' className="card-img" alt='Poster' />

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
    )
}

export default PostView