const ErrorTag = ({ msg }) => {
    return(
        <div className="tag tag-red fw-500 mt-1 flex align-center">
            <i className="lni lni-warning mr-h"></i>
            <span>{msg}</span>
        </div>
    )
}

export default ErrorTag