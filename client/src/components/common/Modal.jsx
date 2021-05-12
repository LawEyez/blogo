import { useContext, useEffect } from "react"
import { ErrorContext } from "../../contexts/ErrorContext"
import { ModalContext } from "../../contexts/ModalContext"

const Modal = ({ title, content, callAction, actionText }) => {

    const {dispatch: errorDispatch} = useContext(ErrorContext)
    
    useEffect(() => {
        errorDispatch({ type: 'CLEAR_ERRORS' })

        return () => errorDispatch({ type: 'CLEAR_ERRORS' })
    }, [errorDispatch])

    const {setModalOpen, setEdit}= useContext(ModalContext)

    return (
        <div className="modal">
            <div className="modal-box">
                <button className="btn close-modal" onClick={() => {setEdit(false); setModalOpen(false)}}>
                    <div className="flx align-center">
                        <i className="lnr lnr-cross"></i>
                    </div>
                </button>

                <div className="modal-body">
                    <h1 className='title'>{title}</h1>

                    {content}

                    <div className="flx align-center">
                        <button className="btn btn-swatch6 mr-2" onClick={() => {
                            callAction()
                            setModalOpen(false)
                            setEdit(false)
                        }}>{actionText}</button>
                        
                        <button className="btn" onClick={() => {setEdit(false); setModalOpen(false)}}>cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal