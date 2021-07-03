const Banner = ({ icon, text }) => {
    return (
        <div className="grid align-center justify-center bg-swatch-4 pd-5 br-3">
            <div className="flx flx-col align-center">
                <div className="icon-display flx align-center justify-center">
                    <i className={`lnr lnr-${icon} red-txt txt-xlg`}></i>
                </div>
                
                {text && <h1 className="mt-3 fw-300 swatch-7 txt-center txt-capitalize">{text}</h1>}
            </div>
        </div>
    )
}

export default Banner