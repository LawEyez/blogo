const bookmarkReducer = (state, action) => {
    switch (action) {
        case 'GET_BOOKMARKS':
            return {
                ...state,
                bookmarks: action.payload
            }
        
        default:
            return state
    }
}

export default bookmarkReducer