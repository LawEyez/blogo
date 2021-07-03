import React, { useContext } from 'react'
import { SubContext } from '../../contexts/SubContext'
import Spinner from '../common/Spinner'
import SubList from './SubList'

const SubListContainer = () => {
    const {subs} = useContext(SubContext)

    return (
        <React.Fragment>
            {subs ? <SubList title='subscriptions' subs={subs}/> : <Spinner/>}
        </React.Fragment>
    )
}

export default SubListContainer