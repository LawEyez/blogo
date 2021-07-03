import React, { useContext, useEffect, useState } from "react"
import { Redirect, useHistory, useParams } from "react-router"
import { CKEditor } from  '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { patchPost } from "../../actions/postActions"

import { AuthContext } from "../../contexts/AuthContext"
import { ErrorContext } from '../../contexts/ErrorContext'

import { isEmpty } from "../../helpers"

import ErrorTag from '../common/ErrorTag'
import Spinner from "../common/Spinner"

const EditPost = () => {
    
    // Get id from params
    const {id} = useParams()

    // Setup state
    const [post, setPost] = useState(null)
    const [body, setBody] = useState(null)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    // Setup context
    const { user, accessToken } = useContext(AuthContext)
    const { errors, dispatch: errorDispatch } = useContext(ErrorContext)


    // Fetch post on render
    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:8000/posts/${id}`)
            const resData = await res.json()
            
            if (!resData.err) {
                setPost(resData.postData)
                setPreview({ src: resData.postData.poster})

            } else {
                errorDispatch({ type: 'SET_ERRORS', payload: resData.err })
            }
        })()

    }, [id, errorDispatch])

    // Get history
    const history = useHistory()

    // Handle preview of uploaded image
    const handlePreview = (file) => {
        setLoading(true)

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setPreview({ fileName: file.name, src: reader.result})
            setLoading(false)
        }
    }

    // Handle selected file change
    const handleFileChange = e => {
        const file = e.target.files[0]

        // Exit function if no file has been chosen
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

    // Handle input change
    const handleInputChange = e => {
        setPost(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    // Handle form submit
    const handleSubmit = e => {
        e.preventDefault()

        setSubmitted(true)
        
        const postData = {
            title: post.title,
            body: body ? body : post.body,
            isDraft: post.isDraft,
        }

        if (image) {
            postData.image = image
            console.log('RATATATATTATATATTAT')
        }

        if (e.target.value === 'publish') {
            postData.isDraft = false
        }
            
        patchPost(id, postData, accessToken, errorDispatch, history)
    }
    

    return(
        <div className="mt-3">
            {/* Redirect to post detail page if authenticated user is not the post author */}
            {post && (user.userId !== post.author._id) && <Redirect to={`/posts/${id}`} />}

            {/* Show spinner after submission */}
            {submitted && isEmpty(errors) && <Spinner />}

            {!isEmpty(post) ? (
                <React.Fragment>
                    <h1 className="title">
                        <span className="fw-300">+ edit </span>
                        <span className="red-txt">post +</span>
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <h1 className="txt-capitalize grey-light mb-1">Edit Title</h1>
                        <h3 className="swatch-7 mb-3 fw-300">Write the title of your post below. Make sure it's interesting.</h3>

                        <div className="form-group mb-4">
                            <input className={errors && errors.title ? 'border-red' : ''} type="text" placeholder='Add Title' name='title' value={post.title} onChange={handleInputChange} />
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

                                        <span className='txt-md swatch-7'>{preview && preview.fileName ? preview.fileName : 'No File Chosen'}</span>
                                    </div>
                                </div>

                                <div className="g-col bg-swatch-4 grid img-preview">
                                    {preview && preview.src ? (
                                        loading ? <Spinner /> : <img className="grid-center" src={preview.src} alt="" />
                                    ) : (
                                        loading ? <Spinner /> : <h1 className="fw-200 grid-center txt-lg swatch-7">No preview to show</h1>
                                    )}
                                </div>
                            </div>
                        </div>

                        <hr className="mb-4" />
                        
                        <h1 className="txt-capitalize grey-light mb-1">Edit Body</h1>
                        <h3 className="swatch-7 mb-3 fw-300">Now it's time for the masterpiece we can't wait to read.</h3>
                        
                        <div className="form-group mb-2 rounded">
                            <CKEditor
                                editor={ClassicEditor}
                                data={post.body}
                                onChange={(e, editor) => {
                                    setBody(editor.getData())
                                }}
                            />
                            { errors && errors.body && <ErrorTag msg={errors.body} /> }
                        </div>

                        <div className="flx justify-end align-center">
                            <button type='submit' className="btn btn-swatch7-outline mr-2">save changes</button>
                            {post.isDraft && <button type='submit' onClick={handleSubmit} value='publish' className="btn">save changes & publish</button>}
                        </div>
                    </form>
                </React.Fragment>
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export default EditPost