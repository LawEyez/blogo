import PostView from "./PostView"

const PostGrid = ({ posts }) => {
    return (
        <div className="grid grid-col-4 gap-2">
            {posts.map(post => <PostView key={post._id} post={post} />)}
        </div>
    )
}

export default PostGrid