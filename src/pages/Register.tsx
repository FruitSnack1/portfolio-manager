import React, { useState } from 'react'
import { fbApp } from '../fireapp'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Button, Input, Typography } from '@mui/joy'

function Register() {
  console.log(fbApp.name)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const auth = getAuth()

  const register = async (event: any) => {
    event.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={register}>
      {error && <p>{error}</p>}
      <Typography level="h3" sx={{ mb: 2 }}>
        Register
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

export default Register
