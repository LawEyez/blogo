import { Link } from "react-router-dom"

const Social = () => {
    return (
        <div className="social flx align-center txt-md">
            <Link to='/' className='swatch-7 mr-2'>
                <i className="lni lni-facebook-filled"></i>
            </Link>
            
            <Link to='/' className='swatch-7 mr-2'>
                <i className="lni lni-twitter"></i>
            </Link>
            
            <Link to='/' className='swatch-7'>
                <i className="lni lni-instagram"></i>
            </Link>
        </div>
    )
}

export default Social