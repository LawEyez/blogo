import { useContext, useEffect } from "react"
import { ErrorContext } from "../contexts/ErrorContext"

const useClearError = () => {
    const { dispatch } = useContext(ErrorContext)

    useEffect(() => {
        return () => dispatch({ type: 'CLEAR_ERRORS' })
    }, [dispatch])
}

export default useClearError