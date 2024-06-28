import React, { useState } from 'react'
import { fbApp } from '../fireapp'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Box, Button, Input, Typography } from '@mui/joy'
import LoginWrapper from '../components/LoginWrapper'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FormError from '../components/FormError'

function Register() {
  // const [error, setError] = useState(null)

  const auth = getAuth()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordAgain: '',
    },
  })

  const submit = handleSubmit(async (data) => {
    if (data.password !== data.passwordAgain) {
      setError('password', { message: 'Passwords do not match' })
      setError('passwordAgain', { message: 'Passwords do not match' })
      return
    }
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
    } catch (error: any) {
      if (error.message.includes('email-already-in-use')) {
        setError('email', { message: 'Email already in use' })
      } else {
        setError('root', { message: 'Something went wrong' })
      }
    }
  })

  return (
    <LoginWrapper>
      {errors.root && <FormError>{errors.root.message}</FormError>}
      <form onSubmit={submit}>
        <Typography level="h3" sx={{ mb: 2 }}>
          Register
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
          {...register('password', {
            required: 'Password required',
            validate: (value) =>
              value.length > 8 || 'Password too short, min 8 characters',
          })}
          color={errors.password ? 'danger' : 'neutral'}
          sx={{ mb: 1 }}
          type="password"
          placeholder="Password"
        />
        {errors.password && <FormError>{errors.password.message}</FormError>}
        <Input
          {...register('passwordAgain', {
            required: 'Password again required',
            validate: (value) =>
              value.length > 8 || 'Password too short, min 8 characters',
          })}
          color={errors.passwordAgain ? 'danger' : 'neutral'}
          sx={{ mb: 1 }}
          type="password"
          placeholder="Password again"
        />
        {errors.passwordAgain && (
          <FormError>{errors.passwordAgain.message}</FormError>
        )}
        <Button type="submit" fullWidth>
          Register
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          Already have an account? <Link to={'/login'}>Login</Link>
        </Box>
      </form>
    </LoginWrapper>
  )
}

export default Register
