import React, { useContext } from "react"

import { allowComment, deleteComment, editComment } from "../../actions/commentActions"

import { AuthContext } from "../../contexts/AuthContext"
import { ErrorContext } from "../../contexts/ErrorContext"
import { ModalContext } from "../../contexts/ModalContext"
import { PostContext } from "../../contexts/PostContext"

import Badge from "../common/Badge"
import Modal from "../common/Modal"
import ErrorTag from "../common/ErrorTag"

import { isEmpty } from "../../helpers"

import useFormInput from "../../hooks/useFormInput"

const CommentView = ({ comment }) => {
    
    const {post} = useContext(PostContext)
    const {user, accessToken} = useContext(AuthContext)
    const {errors, dispatch: errorDispatch} = useContext(ErrorContext)
    const {modalOpen, setModalOpen, edit, setEdit} = useContext(ModalContext)
    
    const commentBody = useFormInput(comment.body)

    const handleDeleteComment= () => {
        deleteComment(comment._id, accessToken, errorDispatch)
    }
    
    const handleAllowComment = () => {
        allowComment(comment._id, accessToken, errorDispatch)
    }
    
    const handleEditComment = e => {
        e.preventDefault()

        const data = {
            body: commentBody.value
        }

        editComment(comment._id, data, accessToken, errorDispatch)

        if (!isEmpty(data.body)) {
            setModalOpen(false)
        }
    }
    
    const modalContent = (
        <div className="mb-2">
            <form onSubmit={handleEditComment} className="flx align-start">
                <div className="form-group mb-2 mr-1">
                    <input className={errors && errors.body ? 'border-red' : ''} type="text" placeholder='Edit Comment' {...commentBody} />
                    {errors && errors.body && <ErrorTag msg={errors.body} />  }
                </div>
                <button className="btn" type="submit">save</button>
            </form>
        </div>
    )

    return (
        <React.Fragment>
            {edit && modalOpen && <Modal
                title='Edit Comment'
                content={modalContent}
                callAction={() => setModalOpen(false)}
                actionText='OK'
            />}

            {comment &&
            <div className="comment-view flx align-start">
                <Badge img={comment.author.avatar} />
                <div className="comment-content flx align-center justify-between">
                    <div className="flx flx-col ml-1">
                        <span className="badge-txt">{comment.author.firstName} {comment.author.lastName}</span>
                        <p className="">{comment.body}</p>
                        <div className="flx align-center mt-1 red-txt">
                            <i className="lni lni-thumbs-up mr-2"></i>
                            <i className="lni lni-thumbs-down mr-2"></i>
                            <i className="lni lni-bubble"></i>
                        </div>
                    </div>

                    <div className="flx align-center">
                        {(post.postData.author._id === user.userId && !comment.isAllowed) && <button onClick={handleAllowComment} className="btn mr-2">Allow</button>}
                        {comment.author._id === user.userId && <button onClick={() => {setEdit(true); setModalOpen(true)}} className="btn mr-2">Edit</button>}
                        {(post.postData.author._id === user.userId || comment.author._id === user.userId) && <button onClick={handleDeleteComment} className="btn btn-swatch6-outline">Delete</button>}
                    </div>
                </div>
            </div>}
        </React.Fragment>
    )
}

export default CommentView