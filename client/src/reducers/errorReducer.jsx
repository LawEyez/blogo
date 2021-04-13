const errorReducer = (state, action) => {
    switch(action.type) {
        case 'SET_ERRORS':
            return {
                ...state,
                errors: action.payload
            }
        
        case 'CLEAR_ERRORS':
            return {
                ...state,
                errors: null
            }
        
        default:
            return state
    }
}

export default errorReducer