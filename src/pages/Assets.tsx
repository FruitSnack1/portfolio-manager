import { Box, Grid, Option, Select, Sheet, Typography } from '@mui/joy'
import { FC, useState } from 'react'
import store, { Asset } from '../store/Store'
import SheetContainer from '../components/SheetConatiner'
import AssetHistoryChart from '../components/charts/AssetHistoryChart'
import { formatPrice } from '../utils'

const Assets: FC = () => {
  const [asset, setAsset] = useState<Asset>(store.assets[0])

  return (
    <>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={12}>
          <Typography level="h2" component="h1">
            Assets
          </Typography>
        </Grid>
        <Grid xs={3}>
          <Select
            placeholder="Choose one…"
            onChange={(_, newValue: string | null) =>
              setAsset(
                store.assets.find((asset) => asset.name === newValue) ??
                  store.assets[0]
              )
            }
          >
            {store.assets.map((asset) => (
              <Option value={asset.name}>{asset.name}</Option>
            ))}
          </Select>
        </Grid>
        <Grid xs={12}>
          <SheetContainer>
            <Box sx={{ p: 5 }}>
              <Typography level="h4" sx={{ mb: 2, color: 'gray' }}>
                {asset?.name}
              </Typography>
              <Box sx={{ textAlign: 'left', display: 'inline' }}>
                <Typography level="h1" sx={{ mb: 0 }} fontWeight={800}>
                  {formatPrice(asset?.balance)}
                </Typography>
                <Typography
                  color={
                    asset.balance - asset.deposit < 0 ? 'danger' : 'success'
                  }
                  sx={{ mb: 2 }}
                >
                  {`${formatPrice(asset.balance - asset.deposit)} (${(
                    (asset.balance / asset.deposit - 1) *
                    100
                  ).toFixed(1)}%)`}
                </Typography>
              </Box>
              <AssetHistoryChart
                dataset={store.historyChartData(true, asset.name)}
                assetName={asset.name}
              />
            </Box>
          </SheetContainer>
        </Grid>
      </Grid>
    </>
  )
}

export default Assets
