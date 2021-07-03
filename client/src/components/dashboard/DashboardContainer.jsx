import { useContext } from 'react'

import useFetch from '../../hooks/useFetch'

import { AuthContext } from '../../contexts/AuthContext'

import Dashboard from "./Dashboard"
import Spinner from '../common/Spinner'

const DashboardContainer = () => {
    const { accessToken } = useContext(AuthContext)

    const {data, errors, isLoading} = useFetch({
        url: `http://localhost:8000/overview`,
        method: 'GET',
        accessToken
    })

    return isLoading && !data ? <Spinner /> : <Dashboard data={data} />
}

export default DashboardContainer