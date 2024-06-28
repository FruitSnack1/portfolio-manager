import { BarChart, BarChartProps } from '@mui/x-charts/BarChart'
import SheetContainer from '../SheetConatiner'
import store from '../../store/Store'
import { Box, Button, ButtonGroup } from '@mui/joy'
import { FC, useState } from 'react'
import { formatPrice } from '../../utils'
import { DatasetType } from '@mui/x-charts/models/seriesType/config'

const chartSetting = {
  width: 1200,
  height: 500,
}

type AssetHistoryChartProps = {
  dataset: Record<string, any>
  assetName: string
}

const AssetHistoryChart: FC<AssetHistoryChartProps> = ({
  dataset,
  assetName,
}) => {
  const [percent, setPercent] = useState(true)

  const valueFormatter = (value: number) =>
    percent ? `${value}%` : formatPrice(value)

  return (
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
      {/* <BarChart
        dataset={store.historyChartData(percent, assetName)}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={store.assets
          .filter((asset) => asset.name === assetName)
          .map((asset) => ({
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
      /> */}
    </Box>
  )
}

export default AssetHistoryChart
