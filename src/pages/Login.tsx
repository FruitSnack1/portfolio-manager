import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Button, Input, Typography } from '@mui/joy'
import loginStore from '../store/loginStore'
import { Router, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const auth = getAuth()
  const navigate = useNavigate()

  const register = async (event: any) => {
    event.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('autho cur', auth.currentUser)
      navigate('/app')
      loginStore.login()
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={register}>
      {error && <p>{error}</p>}
      <Typography level="h3" sx={{ mb: 2 }}>
        Login
      </Typography>
      <Input
        sx={{ mb: 1 }}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        sx={{ mb: 1 }}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" fullWidth>
        Sign in
      </Button>
    </form>
  )
}

export default Login
