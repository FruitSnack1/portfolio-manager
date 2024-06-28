import { FC, useEffect, useState } from 'react'
import SheetContainer from '../components/SheetConatiner'
import { Box, Button, Stack, Table, Typography } from '@mui/joy'
import store from '../store/Store'
import { formatDate, formatPrice } from '../utils'
import AddNewRecord from '../components/AddNewModal'
import { Log, getLogs } from '../api/logs'

const Records: FC = () => {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      const logs = await getLogs()
      setLogs(logs)
    }
    fetchLogs()
  }, [])

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
            <th style={{ textAlign: 'right' }}>Deposit</th>
            <th style={{ textAlign: 'right' }}>Balance</th>
            <th></th>
          </thead>
          <tbody>
            {store.logs.map((row, i) => (
              <tr key={i}>
                <td>{row.asset}</td>
                <td>{formatDate(row.date.toISOString())}</td>
                <td style={{ textAlign: 'right' }}>
                  {formatPrice(row.deposit)}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {formatPrice(row.balance)}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Button
                    onClick={() => {
                      store.removeLog(row.id)
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
