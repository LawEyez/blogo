import { useContext } from "react"

import { AuthContext } from "../../contexts/AuthContext"
import { ErrorContext } from "../../contexts/ErrorContext"
import { SubContext } from "../../contexts/SubContext"

import { isEmpty } from "../../helpers"

import { deleteSub, postSub } from "../../actions/subActions"

import SubActions from "./SubActions"

const SubActionsContainer = ({ channel }) => {
    // Get subs from sub context.
    const {subs} = useContext(SubContext)

    const {user, accessToken, isAuthenticated} = useContext(AuthContext)
    const {dispatch: errorDispatch} = useContext(ErrorContext)

    // Check if sub exists
    let hasSub
    let sub
    const diffChannel = channel !== user.userId

    // Wrap in try-catch as subs might be undefined
    if (isAuthenticated) {
        try {
            sub = subs.find(sub => sub.channel._id === channel)
            hasSub = !isEmpty(sub)

        } catch (error) {
            console.log('YOU FUCKED UP SOMEWHERE')
        }
    }

    console.log('SUBSCRIBED: ', hasSub)

    // Handle subsription attempt.
    const handleSubActions = e => {
        if (e.target.value === 'sub') {
            const data = {
                subscriber: user.userId,
                channel
            }
    
            postSub(data, accessToken, errorDispatch)

        } else {
            deleteSub(sub._id, accessToken, errorDispatch)
        }
    }

    return <SubActions hasSub={hasSub} handleSubActions={handleSubActions} diffChannel={diffChannel} />
}

export default SubActionsContainer