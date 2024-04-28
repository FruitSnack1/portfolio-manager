import { FC } from 'react'
import SheetContainer from '../components/SheetConatiner'
import { Box, Button, Stack, Table, Typography } from '@mui/joy'
import store from '../store/Store'
import { formatDate, formatPrice } from '../utils'
import AddNewRecord from '../components/AddNewModal'

const Records: FC = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{ mb: 2 }}
      >
        <Typography level="h2">Records</Typography>
        <AddNewRecord />
      </Stack>
      <SheetContainer>
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground':
              'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground':
              'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <th>Asset</th>
            <th>Date</th>
            <th>Deposit</th>
            <th>Balance</th>
            <th></th>
          </thead>
          <tbody>
            {store.data.map((row) => (
              <tr key={row.date}>
                <td>{row.asset}</td>
                <td>{formatDate(row.date)}</td>
                <td>{formatPrice(row.deposit)}</td>
                <td>{formatPrice(row.balance)}</td>
                <td>
                  <Button
                    onClick={() => {
                      store.remove(row.id)
                    }}
                    variant="outlined"
                    color="neutral"
                    size="sm"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </SheetContainer>
    </Box>
  )
}

export default Records
