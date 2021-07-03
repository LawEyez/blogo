import { useContext, useState } from "react"

import Badge from "../common/Badge"
import ErrorTag from "../common/ErrorTag"

import { AuthContext } from '../../contexts/AuthContext'
import { ErrorContext } from '../../contexts/ErrorContext'

import { postComment } from "../../actions/commentActions"
import { Link } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"

const AddComment = ({ postId, commentId }) => {

    const [body, setBody] = useState('')
    const { user: authUser, accessToken, isAuthenticated } = useContext(AuthContext)
    const {user} = useContext(UserContext)
    const {errors, dispatch: errorDispatch} = useContext(ErrorContext)

    const handleSubmit = e => {
        e.preventDefault()
        
        const data = {
            body,
            author: authUser.userId
        }

        if (postId) {
            data.post = postId

        } else if (commentId) {
            data.comment = commentId
        }

        postComment(data, accessToken, errorDispatch)

        setBody('')
    }

    return (
        <div className="comment-form flx align-start justify-center mt-3">
            <Badge img={user.avatar} />

            <form onSubmit={handleSubmit} className="ml-1 flx flx-col">
                <div className="form-group">
                    <input className={errors && errors.body ? 'border-red' : ''} type="text" name="body" placeholder="Add a comment" value={body} onChange={e => setBody(e.target.value)} />
                    {errors && errors.body && <ErrorTag msg={errors.body} />}
                </div>
                {isAuthenticated ? (
                    <button className="btn mt-1">comment</button>
                ) : (
                    <Link to='/login' className='btn mt-1'>Login to comment</Link>
                )}
            </form>
        </div>
    )
}

export default AddComment