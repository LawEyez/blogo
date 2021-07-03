import { useContext } from "react"

import { createBookmark, removeBookmark } from "../../actions/bookmarkActions"

import { AuthContext } from "../../contexts/AuthContext"
import { ErrorContext } from "../../contexts/ErrorContext"
import { PostContext } from "../../contexts/PostContext"

import BookmarkControls from "./BookmarkControls"

const BookmarkControlsContainer = () => {

    // Setup contexts
    const {user, accessToken} = useContext(AuthContext)
    const {dispatch: errorDispatch} = useContext(ErrorContext)
    const {post} = useContext(PostContext)

    // Handle creating a new bookmark
    const handleCreateBookmark = () => {
        const data = {
            user: user.userId,
            post: post.postData._id
        }

        createBookmark(data, accessToken, errorDispatch)
    }

    // Handle deleting a bookmark
    const handleRemoveBookmark = () => {
        removeBookmark(post.bookmark._id, accessToken, errorDispatch)
    }

    return <BookmarkControls 
            isBookmarked={post.isBookmarked} 
            handleCreateBookmark={handleCreateBookmark} 
            handleRemoveBookmark={handleRemoveBookmark}
            bookmark={post.bookmark}
            />
}

export default BookmarkControlsContainer