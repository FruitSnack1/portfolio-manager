import { BarChart } from '@mui/x-charts/BarChart'
import SheetContainer from './SheetConatiner'
import store from '../store/Store'

const chartSetting = {
  width: 1200,
  height: 500,
}

const valueFormatter = (value: number) => `${value}%`

export default function HistoryChart() {
  return (
    <SheetContainer>
      <BarChart
        dataset={store.historyChartData}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={store.assets.map((asset) => ({
          dataKey: asset.name,
          label: asset.name,
          valueFormatter,
        }))}
        {...chartSetting}
        slotProps={{
          legend: {
            position: {
              horizontal: 'right',
              vertical: 'top',
            },
            labelStyle: {
              fontSize: 12,
            },
          },
        }}
      />
    </SheetContainer>
  )
}
