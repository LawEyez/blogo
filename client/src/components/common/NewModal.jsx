import { useEffect, useState } from "react"

const NewModal = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(true)
        
    }, [])


    return isOpen && (
        <div className="modal">
            <div className="modal-box">
                <button className="btn close-modal" onClick={() => {setIsOpen(false); props.toggleModalState()}}>
                    <i className="lnr lnr-cross"></i>
                </button>

                {props.render({ isOpen, setIsOpen })}
            </div>
        </div>
    )
}

export default NewModal