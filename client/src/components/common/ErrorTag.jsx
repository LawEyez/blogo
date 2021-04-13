const ErrorTag = ({ msg }) => {
    return(
        <div className="tag tag-red fw-500 mt-1">
            <span>{msg}</span>
        </div>
    )
}

export default ErrorTag