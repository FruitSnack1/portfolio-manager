import { FC } from 'react'
import SheetContainer from './SheetConatiner'
import { Box, Typography } from '@mui/joy'
import { ArrowDropUp } from '@mui/icons-material'
import store from '../store/Store'
import { formatPrice } from '../utils'

const CurrentBalance: FC = () => {
  return (
    <SheetContainer>
      <Box sx={{ p: 3 }}>
        <Typography level="h2">{formatPrice(store.balance)}</Typography>
        <Typography color="success" startDecorator={<ArrowDropUp />}>
          {formatPrice(store.profit)} ({store.profitPercent}%)
        </Typography>
      </Box>
    </SheetContainer>
  )
}

export default CurrentBalance
