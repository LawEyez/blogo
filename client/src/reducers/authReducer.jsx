const authReducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}


export default authReducer