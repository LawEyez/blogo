import { useState } from "react";
import Spinner from "./Spinner";

const Avatar = ({ src, isInput, setImage }) => {
    const [preview, setPreview] = useState(null)
    // const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    // Handle image preview
    const handlePreview = file => {
        setLoading(true)

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setPreview(reader.result)
            setLoading(false)
        }
    }

    // Handle file change
    const handleFileChange = e => {
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

    return (
        <div className="avatar-wrapper">
            {loading && <Spinner />}
            
            {src ? (
                preview ? <img src={preview} alt='Avatar' /> : <img src={src} alt='Avatar' /> 
            ) : (
                preview ? <img src={preview} alt='Avatar' /> : <i className="lnr lnr-picture"></i>
            )}

            {isInput && (
                <label htmlFor="defaultFileInput" className="btn mr-2">
                    <input type="file" name="poster" id="defaultFileInput" onChange={handleFileChange} />
                    <i className="lnr lnr-pencil"></i>
                </label> 
            )}
        </div>
    )
}

export default Avatar