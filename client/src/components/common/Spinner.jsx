import ReactDOM from "react-dom"

const Spinner = () => {
    const content = (
        <div className="spinner-wrapper">
            <div className="spinner">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )

    return ReactDOM.createPortal(content, document.querySelector('#spinner-root'))
}


export default Spinner