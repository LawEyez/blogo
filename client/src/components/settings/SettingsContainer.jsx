import { useContext } from 'react'

import { UserContext } from '../../contexts/UserContext'

import { isEmpty } from '../../helpers'

import Spinner from '../common/Spinner'
import Settings from './Settings'

const SettingsContainer = () => {
    const {user} = useContext(UserContext)
    // const {user, accessToken} = useContext(AuthContext)
    // const userId = user.userId

    // const { data, isLoading, errors } = useFetch({
    //     url: `http://localhost:8000/users/${userId}`,
    //     method: 'GET',
    //     accessToken
    // })


    // console.log('SETTINGS: ', data)

    return isEmpty(user) ? <Spinner/> : <Settings data={user} />
}

export default SettingsContainer