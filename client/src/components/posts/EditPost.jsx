import { useContext, useState } from "react"
import { useHistory } from "react-router"
import { CKEditor } from  '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { patchPost } from "../../actions/postActions"

import { AuthContext } from "../../contexts/AuthContext"
import { ErrorContext } from '../../contexts/ErrorContext'

import useClearErrors from "../../hooks/useClearErrors"

import ErrorTag from '../common/ErrorTag'
import useFormInput from "../../hooks/useFormInput"
import { PostContext } from "../../contexts/PostContext"

const EditPost = () => {

    // Clear errors once component unmounts.
    useClearErrors()

    // Clear post when component unmounts
    

    // Get post from context.
    const { post } = useContext(PostContext)
    console.log(post)


    // Configure state.
    const title = useFormInput(post && post.postData.title ? post.postData.title : '')
    const [body, setBody] = useState(post && post.postData.body ? post.postData.body : '')

    const { accessToken } =  useContext(AuthContext)
    const { errors, dispatch } = useContext(ErrorContext)

    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
        
        const postData = { title: title.value, body, isDraft: post.postData.isDraft}

        if (e.target.value === 'publish') {
            postData.isDraft = false
        }
               
        patchPost(post.postData._id, postData, accessToken, dispatch, history)
    }

    return (
        <div className="mt-3">
            <h1 className="title">
                <span className="fw-300">+ edit </span>
                <span className="red-txt">post +</span>
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <input className={errors && errors.title ? 'border-red' : ''} type="text" placeholder='Add Title' {...title} />
                    { errors && errors.title && <ErrorTag msg={errors.title} /> }
                </div>
                
                <div className="form-group mb-2 rounded">
                    <CKEditor
                        editor={ClassicEditor}
                        data={body}
                        onChange={(e, editor) => {
                            setBody(editor.getData())
                        }}
                    />
                    { errors && errors.body && <ErrorTag msg={errors.body} /> }
                </div>

                <div className="flx justify-end align-center">
                    <button type='submit' className="btn btn-swatch7-outline mr-2">save changes</button>
                    {post.postData.isDraft && <button type='submit' onClick={handleSubmit} value='publish' className="btn">save changes & publish</button>}
                </div>
            </form>
        </div>
    )
}

export default EditPost