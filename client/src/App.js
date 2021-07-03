import { BrowserRouter } from 'react-router-dom'

import AuthContextProvider from './contexts/AuthContext'
import ErrorContextProvider from './contexts/ErrorContext'
import PostContextProvider from './contexts/PostContext'
import ModalContextProvider from './contexts/ModalContext'
import UserContextProvider from './contexts/UserContext'

import Main from './components/Main'

const App = () => {
    return(
        <BrowserRouter>
            <AuthContextProvider>
                <ErrorContextProvider>
                    <PostContextProvider>
                        <ModalContextProvider>
                            <UserContextProvider>
                                <Main />
                            </UserContextProvider>
                        </ModalContextProvider>
                    </PostContextProvider>
                </ErrorContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )      
}

export default App