import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Transaction from './pages/Transaction'
import NotFound from './pages/NotFound'
import Header from './components/ui/Header'
import { useQuery } from '@apollo/client'
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query'

const App = () => {
  const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER)

  return (
    <div className='z-50 w-screen'> {/* add w-screen class */}
      {data?.authUser && <Header />}
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
