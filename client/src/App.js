import { BrowserRouter } from 'react-router-dom'

import AuthContextProvider from './contexts/AuthContext'
import ErrorContextProvider from './contexts/ErrorContext'
import PostContextProvider from './contexts/PostContext'

import Main from './components/Main'
import ModalContextProvider from './contexts/ModalContext'

const App = () => {
    return(
        <BrowserRouter>
            <AuthContextProvider>
                <ErrorContextProvider>
                    <PostContextProvider>
                        <ModalContextProvider>
                            <Main />
                        </ModalContextProvider>
                    </PostContextProvider>
                </ErrorContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )      
}

export default App