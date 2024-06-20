import { Table, Typography } from '@mui/joy'
import { FC, useEffect, useState } from 'react'
import { formatPrice } from '../utils'
import SheetContainer from './SheetConatiner'
import store from '../store/Store'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { getAssets } from '../api/assets'
import { DocumentData } from 'firebase/firestore'

type PLProps = {
  plPercent: string
  pl: number
}

const PL: FC<PLProps> = ({ plPercent, pl }) => {
  return (
    <Typography
      color={pl < 0 ? 'danger' : 'success'}
      startDecorator={pl < 0 ? <ArrowDropDown /> : <ArrowDropUp />}
    >
      {`${formatPrice(pl)} (${plPercent}%)`}
    </Typography>
  )
}

const AssetTable: FC = () => {
  const [assets, setAssets] = useState<DocumentData[]>([])

  useEffect(() => {
    const fetchAssets = async () => {
      const assets = await getAssets()
      console.log('assets', assets)
      setAssets(assets)
    }
    fetchAssets()
  }, [])

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
            <th>Asset</th>
            <th>Deposit</th>
            <th>Balance</th>
            <th>P/L</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              {/* <td>{formatPrice(row.deposit)}</td>
              <td>{formatPrice(row.balance)}</td>
              <td>
                <PL pl={row.pl} plPercent={row.plPercent} />
              </td>
              <td>{row.share}%</td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </SheetContainer>
  )
}
export default AssetTable
