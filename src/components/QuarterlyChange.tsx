import { FC } from 'react'
import SheetContainer from './SheetConatiner'
import { Table } from '@mui/joy'

const QuarterlyChange: FC = () => {
  return (
    <SheetContainer>
      <Table
        aria-labelledby="tableTitle"
        stickyHeader
        hoverRow
        sx={{
          '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
          '--Table-headerUnderlineThickness': '1px',
          '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
          '--TableCell-paddingY': '4px',
          '--TableCell-paddingX': '8px',
        }}
      >
        <thead>
          <tr>
            <th>Quarter</th>
            <th>Percent change</th>
            <th>Balance change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Q1</td>
            <td>3%</td>
            <td>1,2k</td>
          </tr>
          <tr>
            <td>Q2</td>
            <td>1%</td>
            <td>1,5k</td>
          </tr>
          <tr>
            <td>Q3</td>
            <td>3%</td>
            <td>1,2k</td>
          </tr>
          <tr>
            <td>Q4</td>
            <td>5%</td>
            <td>1,2k</td>
          </tr>
          <tr>
            <td>
              <b></b>
            </td>
            <td>
              <b>9%</b>
            </td>
            <td>
              <b>8,9k</b>
            </td>
          </tr>
        </tbody>
      </Table>
    </SheetContainer>
  )
}

export default QuarterlyChange
