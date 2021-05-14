import PostView from "./PostView"

const UserPosts = ({ posts }) => {
    return (
        <div className="grid grid-col-3">
            {posts.map(post => <PostView key={post._id} post={post} />)}
        </div>
    )
}

export default UserPosts