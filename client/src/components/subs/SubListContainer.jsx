import React, { useContext } from 'react'
import { SubContext } from '../../contexts/SubContext'
import SubList from './SubList'

const SubListContainer = () => {
    const {subs} = useContext(SubContext)

    return (
        <SubList title='subscriptions' subs={subs}/>
    )
}

export default SubListContainer