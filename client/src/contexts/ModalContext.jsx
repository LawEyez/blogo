import { createContext, useState } from "react";

export const ModalContext = createContext()

const ModalContextProvider = props => {
    const [modalOpen, setModalOpen] = useState(false)
    const [edit, setEdit] = useState(false)

    return (
        <ModalContext.Provider value={{ modalOpen, setModalOpen, edit, setEdit }}>
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalContextProvider