import { useEffect, useState } from "react"

const useFetch = (args) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const { url } = args
    const { method } = args.options

    useEffect(() => {
        // Abort controller
        const abortController = new AbortController()

        const options = {
            method
        }
        
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    setError(data.err)

                } else {
                    setData(data)
                }

                setIsLoading(false)
            })
            .catch(err => {
                setError(err)
                setIsLoading(false)
            })
    }, [url, method])

    return { data, isLoading, error }
}

export default useFetch