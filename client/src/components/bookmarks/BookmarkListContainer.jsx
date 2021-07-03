import BookmarkList from "./BookmarkList"

import useFetch from '../../hooks/useFetch'
import Spinner from "../common/Spinner"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const BookmarkListContainer = () => {
    const {accessToken} = useContext(AuthContext)

    // const [bookmarks, setBookmarks] = useState()

    const { data, isLoading, errors } = useFetch({
        url: `http://localhost:8000/bookmarks`,
        method: 'GET',
        accessToken
    })

    console.log(data)

    return isLoading && !data && !errors ? <Spinner /> : <BookmarkList bookmarks={data.bookmarks} />
}

export default BookmarkListContainer