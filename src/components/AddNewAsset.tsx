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
import store from '../store/Store'
import { useState } from 'react'
import { randomUUID } from 'crypto'
import { addAsset, getAssets } from '../api/assets'
import { getAuth } from 'firebase/auth'

export default function AddNewAsset() {
  const [open, setOpen] = useState<boolean>(false)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  const [name, setName] = useState<string>('')

  // getAssets()

  const addNew = async () => {
    const result = await addAsset(name)
    if (result) {
      setOpen(false)
      setSnackbarOpen(true)
    }
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
        Asset added
      </Snackbar>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Add new
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
            Add new asset
          </Typography>

          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              onChange={({ target }) => setName(target.value)}
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
