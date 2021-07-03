import React from "react"

const BookmarkControls = ({ isBookmarked, handleCreateBookmark, handleRemoveBookmark }) => {
    return (
        <React.Fragment>
            {isBookmarked ? (
                <button className="btn btn-light mr-3" onClick={handleRemoveBookmark} ><i className="lnr lnr-bookmark"></i></button>

            ) : (
                <button className="btn btn-light-outline mr-3" onClick={handleCreateBookmark}><i className="lnr lnr-bookmark"></i></button>
            )}
        </React.Fragment>
    )
}

export default BookmarkControls