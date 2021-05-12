const postReducer = (state, action) => {
    switch(action.type) {
        case 'GET_POSTS':
            return {
                ...state,
                posts: action.payload
            }
        
        case 'GET_POST':
            return {
                ...state,
                post: action.payload
            }
        
        case 'CLEAR_POST':
            return {
                ...state,
                post: {}
            }
            
        default:
            return state
    }
}

export default postReducer