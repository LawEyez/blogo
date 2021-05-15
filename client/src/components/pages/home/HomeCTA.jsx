import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"

const HomeCTA = () => {
    const { isAuthenticated } = useContext(AuthContext)
    return (
        <div className="home-cta flx flx-col align-center justify-center">
            <h1 className='flx flx-col'>
                <span className=""><span className="fw-300 swatch-1"> "Here, wars we fight, </span> with words we write."</span>
                
                <div className="flx flx-col">
                    <span className="fw-300 italic txt-md">- Bioga Ojuka</span>
                    <span className="txt-sm txt-uppercase swatch-7 ls-1 mt-1">founder of proze</span>
                </div>
                
            </h1>

            <p className='mt-2'>Rise up. Join the movement. Change the world.</p>

            <div className="mt-3">
                <Link to={isAuthenticated ? '/add-post' : '/login'} className='btn'>
                    <i className="lnr lnr-pencil"></i>
                    <span className='ml-1'>Start Writing</span>
                </Link>
            </div>
        </div>
    )
}

export default HomeCTA