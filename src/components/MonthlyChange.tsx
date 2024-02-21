import { FC } from 'react'
import SheetContainer from './SheetConatiner'
import { Box, Typography } from '@mui/joy'
import { ArrowDropUp } from '@mui/icons-material'

const MonthlyChange: FC = () => {
  return (
    <SheetContainer>
      <Box sx={{ p: 3 }}>
        <Typography level="h4">Average monthly change</Typography>
        <Typography startDecorator={<ArrowDropUp />} level="h3" color="success">
          2.54%
        </Typography>
      </Box>
    </SheetContainer>
  )
}

export default MonthlyChange
