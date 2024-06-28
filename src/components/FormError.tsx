import { Typography } from '@mui/joy'
import { FC, ReactNode } from 'react'

type FormErrorProps = {
  children: ReactNode
}

const FormError: FC<FormErrorProps> = ({ children }) => {
  return (
    <Typography color="danger" sx={{ p: '0', fontSize: '14px' }}>
      {children}
    </Typography>
  )
}

export default FormError
