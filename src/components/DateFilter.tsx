import { Button, ButtonGroup } from '@mui/joy'
import { FC, useState } from 'react'

const DateFilter: FC = () => {
  const lables = ['1M', '6M', '1Y', 'YTD', 'MAX']

  const [index, setIndex] = useState<number>()

  return (
    <ButtonGroup variant="plain">
      {lables.map((lable, i) => (
        <Button
          key={i}
          onClick={() => setIndex(i)}
          variant={index === i ? 'solid' : 'soft'}
        >
          {lable}
        </Button>
      ))}
    </ButtonGroup>
  )
}
export default DateFilter
