import { LineChart } from '@mui/x-charts'
import { FC } from 'react'
import SheetContainer from '../SheetConatiner'
import { observer } from 'mobx-react'
import store from '../../store/Store'
import { Box } from '@mui/joy'
import { formatPrice } from '../../utils'

const BalanceChart: FC = () => {
  console.log(store.data)
  const valueFormatter = (value: number) => {
    return formatPrice(value)
  }

  return (
    <SheetContainer>
      <Box sx={{ pl: 4 }}>
        <LineChart
          xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[
            {
              dataKey: 'balance',
              valueFormatter,
            },
          ]}
          dataset={store.balanceChartData}
          width={1000}
          height={300}
          tooltip={{
            classes: {
              root: 'tooltip',
            },
          }}
        />
      </Box>
    </SheetContainer>
  )
}

export default observer(BalanceChart)
