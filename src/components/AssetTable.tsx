import { Table, Typography } from '@mui/joy'
import { FC, useEffect, useState } from 'react'
import { formatPrice } from '../utils'
import SheetContainer from './SheetConatiner'
import store from '../store/Store'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { getAssets } from '../api/assets'
import { DocumentData } from 'firebase/firestore'

type PLProps = {
  plPercent: number
  pl: number
}

const PL: FC<PLProps> = ({ plPercent, pl }) => {
  return (
    <Typography
      textAlign={'right'}
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
          {store.assetsDetails().map((detail) => (
            <tr key={detail.asset}>
              <td>{detail.asset}</td>
              <td>{formatPrice(detail.deposit)}</td>
              <td>{formatPrice(detail.balance)}</td>
              <td>
                <PL pl={detail.pl} plPercent={detail.plPercent} />
              </td>
              <td>{detail.share}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </SheetContainer>
  )
}
export default AssetTable
