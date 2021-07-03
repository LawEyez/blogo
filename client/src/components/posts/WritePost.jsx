import { useContext, useState } from "react"
import { useHistory } from "react-router"
import { CKEditor } from  '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { createPost } from "../../actions/postActions"

import { AuthContext } from "../../contexts/AuthContext"
import { ErrorContext } from '../../contexts/ErrorContext'

import useClearErrors from "../../hooks/useClearErrors"
import useFormInput from "../../hooks/useFormInput"

import ErrorTag from '../common/ErrorTag'
import Spinner from '../common/Spinner'

import { isEmpty } from "../../helpers"

const WritePost = () => {

    // Clear errors once component unmounts.
    useClearErrors()

    // Configure state.
    const title = useFormInput('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const { accessToken } =  useContext(AuthContext)
    const { errors, dispatch } = useContext(ErrorContext)

    const history = useHistory()

    const handlePreview = (file) => {

        setLoading(true)

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setPreview({ fileName: file.name, src: reader.result})
            setLoading(false)
        }
    }

    const handleFileChange = e => {
        console.log(e.target.files)
        const file = e.target.files[0]

        if (!file) return;

        handlePreview(file)

        const reader = new FileReader()

        reader.readAsArrayBuffer(file)

        reader.onloadend = () => {
            setImage({
                name: file.name,
                size: file.size,
                buffer: Buffer.from(reader.result)
            })
        }

    }

    const handleSubmit = e => {
        e.preventDefault()
        setSubmitted(true)
        
        const postData = { title: title.value, body, isDraft: false, image }

        if (e.target.value === 'draft') {
            postData.isDraft = true
        }
        
        createPost(postData, accessToken, dispatch, history)
    }

    console.log('IMAGE: ', image)

    return (
        
        <div className="mt-3 pos-rel">
            { submitted && isEmpty(errors) && <Spinner />}
            
            <h1 className="title">
                <span className="fw-300">+ write </span>
                <span className="red-txt">post +</span>
            </h1>

            <form onSubmit={handleSubmit} className="mt-3">
                <h1 className="txt-capitalize grey-light mb-1">Add Title</h1>
                <h3 className="swatch-7 mb-3 fw-300">Write the title of your post below. Make sure it's interesting.</h3>

                <div className="form-group mb-4">
                    <input className={errors && errors.title ? 'border-red' : ''} type="text" placeholder='Add Title' {...title} />
                    { errors && errors.title && <ErrorTag msg={errors.title} /> }
                </div>

                <hr className="mb-4" />

                <div className="">
                    <div className="grid grid-col-2 gap-3 mb-4">
                        <div className="g-col">
                            <h1 className="txt-capitalize grey-light mb-1">choose poster</h1>
                            <h3 className="fw-300 swatch-7 mb-3">Choose an image that will be your article's poster.</h3>
                            
                            <div className="flex align-center">
                                <label htmlFor="defaultFileInput" className="btn mr-2">
                                    <input type="file" name="poster" id="defaultFileInput" onChange={handleFileChange} />
                                    <span>choose image</span>
                                </label>

                                <span className='txt-md swatch-7'>{preview ? preview.fileName : 'No File Chosen'}</span>
                            </div>
                        </div>

                        <div className="g-col bg-swatch-4 grid img-preview">
                            {preview ? (
                                loading ? <Spinner /> : <img className="grid-center" src={preview.src} alt="" />
                            ) : (
                                loading ? <Spinner /> : <h1 className="fw-200 grid-center txt-lg swatch-7">No preview to show</h1>
                            )}
                        </div>
                    </div>
                </div>
                
                <hr className="mb-4" />
                
                <h1 className="txt-capitalize grey-light mb-1">Add Body</h1>
                <h3 className="swatch-7 mb-3 fw-300">Now it's time for the masterpiece we can't wait to read.</h3>

                <div className="form-group mb-3 rounded">
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