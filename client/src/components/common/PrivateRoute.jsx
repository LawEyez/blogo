import { useContext } from "react"
import { Redirect, Route } from "react-router"
import { AuthContext } from "../../contexts/AuthContext"

const PrivateRoute = ({ component: Component,  ...rest }) => {

    const { isAuthenticated } = useContext(AuthContext)
    
    return (
        <Route {...rest} render={props => isAuthenticated === true ? (
            <Component {...props} />
        ) : (
            <Redirect to='/login' />
        )} />
    )
}

export default PrivateRoute