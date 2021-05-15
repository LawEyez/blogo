const SubActions = ({ hasSub, handleSubActions, diffChannel }) => {
    
    return (
        <div className="">
            {hasSub ? (
                <button className="btn btn-light" value='unsub' onClick={handleSubActions}>unsubscribe</button>
            ) : (
                diffChannel && <button className="btn btn-light-outline" value='sub' onClick={handleSubActions}>subscribe</button>
                
            )}
        </div>
    )
}

export default SubActions