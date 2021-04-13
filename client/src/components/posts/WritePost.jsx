import { useContext, useState } from "react"
import { useHistory } from "react-router"
import { CKEditor } from  '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { createPost } from "../../actions/postActions"

import { AuthContext } from "../../contexts/AuthContext"
import { ErrorContext } from '../../contexts/ErrorContext'

import useClearErrors from "../../hooks/useClearErrors"

import ErrorTag from '../common/ErrorTag'
import useFormInput from "../../hooks/useFormInput"


const WritePost = () => {

    // Clear errors once component unmounts.
    useClearErrors()

    // Configure state.
    const title = useFormInput('')
    const [body, setBody] = useState('')

    const { accessToken } =  useContext(AuthContext)
    const { errors, dispatch } = useContext(ErrorContext)

    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
        
        const postData = { title: title.value, body, isDraft: false }

        if (e.target.value === 'draft') {
            postData.isDraft = true
        }
        
        createPost(postData, accessToken, dispatch, history)
    }

    return (
        <div className="mt-3">
            <h1 className="title">
                <span className="fw-300">+ write </span>
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
                    <button type='submit' onClick={handleSubmit} value='draft' className="btn btn-swatch7-outline mr-2">save as draft</button>
                    <button type='submit' className="btn">publish</button>
                </div>
            </form>
        </div>
    )
}

export default WritePost