import * as React from 'react'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'
import { FormControl, FormLabel, Grid, Input, Option, Select } from '@mui/joy'

const Add = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
          <FormControl>
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Asset
            </FormLabel>
            <Select
              sx={{ mb: 2 }}
              defaultValue="dog"
              slotProps={{
                button: {
                  id: 'select-field-demo-button',
                  'aria-labelledby':
                    'select-field-demo-label select-field-demo-button',
                },
              }}
            >
              <Option value="dog">Future X1</Option>
              <Option value="cat">S&P 500</Option>
              <Option value="fish">Bonds</Option>
              <Option value="bird">Bird</Option>
            </Select>
            <Grid container spacing={2} sx={{ flexGrow: 1, mb: 1 }}>
              <Grid xs={6}>
                <FormLabel
                  id="select-field-demo-label"
                  htmlFor="select-field-demo-button"
                >
                  Month
                </FormLabel>
                <Select
                  defaultValue="dog"
                  slotProps={{
                    button: {
                      id: 'select-field-demo-button',
                      'aria-labelledby':
                        'select-field-demo-label select-field-demo-button',
                    },
                  }}
                >
                  <Option value="dog">1</Option>
                  <Option value="cat">2</Option>
                  <Option value="fish">3</Option>
                  <Option value="bird">4</Option>
                  <Option value="bird">5</Option>
                  <Option value="bird">6</Option>
                  <Option value="bird">7</Option>
                  <Option value="bird">8</Option>
                  <Option value="bird">9</Option>
                  <Option value="bird">10</Option>
                  <Option value="bird">11</Option>
                  <Option value="bird">12</Option>
                </Select>
              </Grid>

              <Grid xs={6}>
                <FormLabel
                  id="select-field-demo-label"
                  htmlFor="select-field-demo-button"
                >
                  Year
                </FormLabel>

                <Input type="number" placeholder="Type in here…" />
              </Grid>
            </Grid>

            <FormLabel>Deposit</FormLabel>
            <Input type="number" placeholder="Type in here…" sx={{ mb: 2 }} />
            <FormLabel>Balance</FormLabel>
            <Input type="number" placeholder="Type in here…" sx={{ mb: 2 }} />
            <Button>Add record</Button>
          </FormControl>
        </Sheet>
      </Modal>
    </React.Fragment>
  )
}

export default Add
