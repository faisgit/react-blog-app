import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
function App() {
  const dispatch = useDispatch()
  const {loading, setLoading} = useState(true)
  useEffect(() => {
    authService.getCurrentUser()
    .then(userData => {
      if (userData) {
        dispatch(login({userData}))
      }
      else{
        dispatch(logout)
      }
    })
    .finally(() => {
      setLoading(false)
    })
  },[])
  return !loading ?(
    <div>
<h1>Hello world</h1>
    </div>
  ):(
    <div>
      <h1>Loading</h1>
    </div>
  )
}

export default App
