import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Box, Button, Divider, Input, Stack, Typography } from '@mui/joy'
import loginStore from '../store/loginStore'
import { Link, Router, useNavigate } from 'react-router-dom'
import ColorSchemeToggle from '../components/ColorSchemeToggle'
import LoginWrapper from '../components/LoginWrapper'
import { useForm } from 'react-hook-form'
import FormError from '../components/FormError'

function Login() {
  const auth = getAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submit = handleSubmit(async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      navigate('/app')
      loginStore.login()
    } catch (error: any) {
      setError('root', { message: 'Invalid email or password' })
    }
  })

  return (
    <LoginWrapper>
      <form onSubmit={submit}>
        <Typography level="h3" sx={{ mb: 2 }}>
          Login
        </Typography>
        <Input
          {...register('email', { required: 'Email required' })}
          color={errors.email ? 'danger' : 'neutral'}
          sx={{ mb: 1 }}
          type="email"
          placeholder="Email"
        />
        {errors.email && <FormError>{errors.email.message}</FormError>}
        <Input
          {...register('password', { required: 'Password required' })}
          color={errors.password ? 'danger' : 'neutral'}
          sx={{ mb: 1 }}
          type="password"
          placeholder="Password"
        />
        {errors.password && <FormError>{errors.password.message}</FormError>}
        {errors.root && <FormError>{errors.root.message}</FormError>}
        <Button type="submit" fullWidth>
          Sign in
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          Don't have an account? <Link to={'/register'}>Register</Link>
        </Box>
      </form>
    </LoginWrapper>
  )
}

export default Login
