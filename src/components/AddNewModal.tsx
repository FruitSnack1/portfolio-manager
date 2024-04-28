import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'
import {
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Snackbar,
} from '@mui/joy'
import { useEffect, useState } from 'react'
import { getAssets } from '../api/assets'
import { addLog } from '../api/logs'

export default function AddNewRecord() {
  const [open, setOpen] = useState<boolean>(false)

  const [asset, setAsset] = useState<string>('')
  const [assets, setAssets] = useState<string[]>([])
  const defaultDate = new Date()
  defaultDate.setDate(1)
  const [date, setDate] = useState<string>(
    defaultDate.toISOString().substring(0, 10)
  )
  const [deposit, setDeposit] = useState<number>()
  const [balance, setBalance] = useState<number>()
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  const geta = async () => {
    const assets = await getAssets()
    console.log(assets)
    setAssets(assets.map((asset) => asset.name))
    // if (assets.length > 0) setAsset(assets[0].name)
    return assets
  }
  useEffect(() => {
    geta()
  }, [])

  const addNew = async () => {
    // addAsset()
    // store.add(asset, new Date(date).toISOString(), deposit ?? 0, balance ?? 0)
    const result = await addLog(
      asset,
      new Date(date),
      deposit ?? 0,
      balance ?? 0
    )
    setOpen(false)
    setSnackbarOpen(true)
  }

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        variant="outlined"
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => setSnackbarOpen(false)}
      >
        Record added
      </Snackbar>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Add new record
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 5,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography level="h3" id="modal-title" sx={{ mt: 1 }}>
            Add new deposit/balance record
          </Typography>
          <FormLabel>Asset</FormLabel>
          <Select
            onChange={(_, newValue: string | null) => setAsset(newValue ?? '')}
          >
            {assets.map((asset, i) => (
              <Option key={asset} value={asset}>
                {asset}
              </Option>
            ))}
          </Select>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              onChange={({ target }) => {
                console.log(target.value)
                setDate(target.value)
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Deposit</FormLabel>
            <Input
              value={deposit}
              onChange={({ target }) => setDeposit(parseInt(target.value))}
              endDecorator={'Kč'}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Balance</FormLabel>
            <Input
              value={balance}
              onChange={({ target }) => setBalance(parseInt(target.value))}
              endDecorator={'Kč'}
            />
          </FormControl>
          <Button type="submit" fullWidth sx={{ mt: 2 }} onClick={addNew}>
            Add
          </Button>
        </Sheet>
      </Modal>
    </>
  )
}
