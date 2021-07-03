import { useEffect, useState } from "react"
import { isEmpty } from "../helpers"

const useFetch = (args) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState(null)
    
    // Set defaults
    args.accessToken = !isEmpty(args.accessToken) ? args.accessToken : ''
    args.body = !isEmpty(args.body) ? JSON.stringify(args.body) : null 

    const { url } = args
    const { method, accessToken, body } = args


    useEffect(() => {
        // Abort controller
        // const abortController = new AbortController()
        const initOptions = { method }

        const configureOptions = (method, initOptions) => {
            if (method === 'GET' || method === 'DELETE') {
                return {
                    ...initOptions,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }

            } else if (method === 'POST' || method === 'PATCH') {
                return {
                    ...initOptions,
                    body,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            }
        }

        const options = configureOptions(method, initOptions)
        
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    setErrors(data.err)

                } else {
                    setData(data)
                }

                setIsLoading(false)
            })
            .catch(err => {
                setErrors(err)
                setIsLoading(false)
            })
            
    }, [url, method, accessToken, body])

    return { data, isLoading, errors }
}

export default useFetch