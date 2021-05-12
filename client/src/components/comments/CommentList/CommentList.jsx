
import CommentView from "../CommentView"

const CommentList = ({ comments }) => {

    return (
        <div className="comment-list">
            { comments.map(comm => (
                <CommentView key={comm._id} comment={comm} />
            )) }
        </div>
    )
}

export default CommentList