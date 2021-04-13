import { BrowserRouter } from 'react-router-dom'

import AuthContextProvider from './contexts/AuthContext'
import ErrorContextProvider from './contexts/ErrorContext'
import PostContextProvider from './contexts/PostContext'

import Main from './components/Main'

const App = () => {
    return(
        <BrowserRouter>
            <AuthContextProvider>
                <ErrorContextProvider>
                    <PostContextProvider>
                        <Main />
                    </PostContextProvider>
                </ErrorContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )      
}

export default App