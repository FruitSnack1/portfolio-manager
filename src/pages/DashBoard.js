import { Box, Button, Card, Container, Grid, Typography } from '@mui/joy'
import React from 'react'
import AssetTable from '../components/AssetTable'
import ShareChart from '../components/ShareChart'
import PL from '../components/PL'
import Balance from '../components/Balance'
import PLAll from '../components/PLAll'
import Add from '../components/Add'

const DashBoard = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'centerz',
          mb: 3,
        }}
      >
        <Typography level="h1" sx={{ display: 'inline' }}>
          Portfolio Manager
        </Typography>
        <Typography level="h2" color="success" sx={{ display: 'inline' }}>
          $ 445.46
        </Typography>
        <Button>Add</Button>
        <Add />
      </Box>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={6}>
          <Card variant="outlined" sx={{ mb: 2 }}>
            <AssetTable />
          </Card>
          <Card variant="outlined">
            <PL />
          </Card>
        </Grid>
        <Grid xs={6}>
          <Card
            variant="outlined"
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Balance />
          </Card>
          <Card variant="outlined">
            <ShareChart />
          </Card>
        </Grid>
        <Grid xs={12}>
          <Card variant="outlined">
            <PLAll />
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DashBoard
