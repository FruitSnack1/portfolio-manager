import { Box, Grid, Stack, Typography } from '@mui/joy'
import { FC } from 'react'
import DashboardTable from '../components/AssetTable'
import ShareChart from '../components/ShareChart'
import BalanceChart from '../components/BalanceChart'
import CurrentBalance from '../components/CurrentBalance'
import QuarterlyChange from '../components/QuarterlyChange'
import DateFilter from '../components/DateFilter'
import HistoryChart from '../components/HistoryChart'

const Dashboard: FC = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={12}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignContent={'center'}
          >
            <Typography level="h2" component="h1">
              Dashboard
            </Typography>
            <DateFilter />
          </Stack>
        </Grid>
        <Grid xs={3}>
          <CurrentBalance />
        </Grid>
        <Grid xs={2}>
          <QuarterlyChange />
        </Grid>
        <Grid xs={7}>
          <Box sx={{ width: '100%' }}>
            <DashboardTable />
          </Box>
        </Grid>
        <Grid xs={4}>
          <ShareChart />
        </Grid>
        <Grid xs={6}>
          <BalanceChart />
        </Grid>
        <Grid xs={12}>
          <HistoryChart />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
