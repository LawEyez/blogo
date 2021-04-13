import { useEffect, useState } from "react"

const useFetch = (args) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Abort controller
        const abortController = new AbortController()

        if (args.body) {
            args.options.body = JSON.stringify(args.body)
        }

        fetch(args.url, args.options)
        .then(res => res.json())
        .then(data => {
            
        })

        
    })
}

export default useFetch