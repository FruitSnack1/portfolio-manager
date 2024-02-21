import { Box, Grid, Stack, Typography } from '@mui/joy'
import { FC } from 'react'
import DashboardTable from '../components/AssetTable'
import ShareChart from '../components/charts/ShareChart'
import BalanceChart from '../components/charts/BalanceChart'
import CurrentBalance from '../components/CurrentBalance'
import QuarterlyChange from '../components/QuarterlyChange'
import DateFilter from '../components/DateFilter'
import HistoryChart from '../components/charts/HistoryChart'
import MonthlyChange from '../components/MonthlyChange'

const Dashboard: FC = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ flexGrow: 1, mb: 2 }}>
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
          <Grid xs={12} sx={{ mb: 2 }}>
            <CurrentBalance />
          </Grid>
          <Grid xs={12}>
            <MonthlyChange />
          </Grid>
        </Grid>
        <Grid xs={2}>
          <QuarterlyChange />
        </Grid>
        <Grid xs={7}>
          <DashboardTable />
        </Grid>
        <Grid xs={4}>
          <ShareChart />
        </Grid>
        <Grid xs={8}>
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
