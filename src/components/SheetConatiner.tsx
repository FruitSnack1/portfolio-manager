import { Sheet } from '@mui/joy'
import { FC } from 'react'

type SheetContainerProps = {
  children: React.ReactNode
}

const SheetContainer: FC<SheetContainerProps> = ({ children }) => {
  return (
    <Sheet
      variant="outlined"
      sx={{
        // display: { xs: 'none', sm: 'initial' },
        width: '100%',
        borderRadius: 'sm',
        flexShrink: 1,
        overflow: 'auto',
        minHeight: 0,
      }}
    >
      {children}
    </Sheet>
  )
}

export default SheetContainer
