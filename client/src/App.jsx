import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <h1>Pagina principal</h1> }></Route>
                <Route path='/login' element={ <LoginPage></LoginPage> }></Route>
                <Route path='/register' element={ <RegisterPage></RegisterPage> }></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App