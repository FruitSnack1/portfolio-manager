import { BarChart } from '@mui/x-charts/BarChart'
import SheetContainer from '../SheetConatiner'
import store from '../../store/Store'
import { Box, Button, ButtonGroup } from '@mui/joy'
import { useState } from 'react'
import { formatPrice } from '../../utils'

const chartSetting = {
  width: 1200,
  height: 500,
}

export default function HistoryChart() {
  const [percent, setPercent] = useState(true)

  const valueFormatter = (value: number) =>
    percent ? `${value}%` : formatPrice(value)

  return (
    <SheetContainer>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ButtonGroup sx={{ position: 'absolute', top: 40, right: 40 }}>
          <Button
            variant={`${percent ? 'solid' : 'soft'}`}
            onClick={() => setPercent(true)}
          >
            %
          </Button>
          <Button
            variant={`${percent ? 'soft' : 'solid'}`}
            onClick={() => setPercent(false)}
          >
            $
          </Button>
        </ButtonGroup>
        <BarChart
          dataset={store.historyChartData(percent)}
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
      </Box>
    </SheetContainer>
  )
}
