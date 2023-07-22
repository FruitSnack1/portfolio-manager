import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
const PL = () => {
  return (
    <div>
      <BarChart
        xAxis={[
          {
            scaleType: 'band',
            data: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
            ],
          },
        ]}
        series={[{ data: [2, 5, 6, -5, 0, 0, 0, 0, 0, 0, 0, 0] }]}
        width={700}
        height={300}
      />
    </div>
  )
}

export default PL
