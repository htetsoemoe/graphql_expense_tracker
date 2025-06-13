import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Transaction from './pages/Transaction'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className='z-50'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/transaction/:id' element={<Transaction />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
