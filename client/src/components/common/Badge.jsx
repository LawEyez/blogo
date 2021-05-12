const Badge = ({ img, txt }) => {
    return(
        <div className="badge flx align-center">
            {txt && <span className="badge-txt">{txt}</span>}

            <div className="badge-img">
                { img ? (
                    <img src={img} alt=""/>
                ) : (
                    <i className="lnr lnr-user"></i>
                    // <img src="/img/avatar.jpg" alt=""/>
                ) }
                
            </div>
        </div>
    )
}

export default Badge