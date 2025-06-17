import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Transaction from './pages/Transaction'
import NotFound from './pages/NotFound'
import Header from './components/ui/Header'
import { useQuery } from '@apollo/client'
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER)
  console.log(`authUser: ${data?.authUser}`)

  if (loading) return <p>Loading...</p>

  return (
    <div className='z-50 w-screen'> {/* add w-screen class */}
      {data?.authUser && <Header />}
      <div>
        <Routes>
          <Route path='/' element={data?.authUser ? <Home /> : <Navigate to='/signin' />} />
          <Route path='/signin' element={data?.authUser ? <Navigate to='/' /> : <SignIn />} />
          <Route path='/signup' element={data?.authUser ? <Navigate to='/' /> : <SignUp />} />
          <Route path='/transaction/:id' element={data?.authUser ? <Transaction /> : <Navigate to='/signin' />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  )
}

export default App
