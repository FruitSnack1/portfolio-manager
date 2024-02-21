import { PieChart } from '@mui/x-charts'
import { FC } from 'react'
import SheetContainer from '../SheetConatiner'
import store from '../../store/Store'

const ShareChart: FC = () => {
  return (
    <SheetContainer>
      <PieChart
        series={[
          {
            paddingAngle: 5,
            innerRadius: 60,
            outerRadius: 80,
            data: store.shareChartData,
          },
        ]}
        width={500}
        height={300}
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: 12,
            },
          },
        }}
      />
    </SheetContainer>
  )
}

export default ShareChart
