import React from "react"

const SubActions = ({ hasSub, handleSubActions, diffChannel, isAuthenticated }) => {
    
    return (
        <React.Fragment>
            {hasSub ? (
                <button className="btn btn-light" value='unsub' onClick={handleSubActions}>unsubscribe</button>
            ) : (
                isAuthenticated && diffChannel && <button className="btn btn-light-outline" value='sub' onClick={handleSubActions}>subscribe</button>
            )}
        </React.Fragment>
    )
}

export default SubActions