const subReducer = (state, action) => {
    switch(action.type) {
        case 'GET_SUBS':
            return {
                ...state,
                subs: action.payload
            }
        
        default:
            return state
    }
}

export default subReducer