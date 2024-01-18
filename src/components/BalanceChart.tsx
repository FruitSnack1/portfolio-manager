import { LineChart } from '@mui/x-charts'
import { FC } from 'react'
import SheetContainer from './SheetConatiner'
import { observer } from 'mobx-react'
import store from '../store/Store'

const BalanceChart: FC = () => {
  console.log(store.data)
  return (
    <SheetContainer>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={500}
        height={300}
      />
    </SheetContainer>
  )
}

export default observer(BalanceChart)
