const DataDisplay = ({ label, value, icon }) => {
    return (
        <div className="data-display flx align-center">
            <i className={`lnr lnr-${icon} mr-2 txt-lg red-txt`}></i>

            <div className="">
                <p className={label === 'email' ? 'txt-md mb-h fw-300': 'txt-capitalize txt-md mb-h fw-300'}>{value ? value : '-'}</p>
                <p className="txt-capitalize fw-500 swatch-7 txt-sm">{label}</p>
            </div>
        </div>
    )
}

export default DataDisplay