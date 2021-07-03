const PageTitle = ({ title }) => {
    return (
        <h1 className="title red-txt fw-700">
            <span className="">+ </span>
            <span className="swatch-1 fw-700">{title}</span>
            <span className=""> +</span>
        </h1>
    )
}

export default PageTitle