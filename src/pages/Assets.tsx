import { Box, Grid, Option, Select, Sheet, Typography } from '@mui/joy'
import { FC, useMemo, useState } from 'react'
import store from '../store/Store'
import SheetContainer from '../components/SheetConatiner'
import AssetHistoryChart from '../components/charts/AssetHistoryChart'
import { formatPrice } from '../utils'
import AddNewAsset from '../components/AddNewAsset'
import { Asset } from '../api/assets'

const Assets: FC = () => {
  const [assetName, setAssetName] = useState<string>(store.assets[0].name)

  const asset = useMemo(() => store.assetsDetails(assetName)[0], [assetName])

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
              setAssetName(newValue ?? '')
            }
          >
            {store.assets.map((asset) => (
              <Option key={asset.name} value={asset.name}>
                {asset.name}
              </Option>
            ))}
          </Select>
          <AddNewAsset />
        </Grid>
        <Grid xs={12}>
          <SheetContainer>
            <Box sx={{ p: 5 }}>
              <Typography level="h4" sx={{ mb: 2, color: 'gray' }}>
                {asset.asset}
              </Typography>
              <Box sx={{ textAlign: 'left', display: 'inline' }}>
                <Typography level="h1" sx={{ mb: 0 }} fontWeight={800}>
                  {formatPrice(asset.balance)}
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
                dataset={store.historyChartData(true, asset.asset)}
                assetName={asset.asset}
              />
            </Box>
          </SheetContainer>
        </Grid>
      </Grid>
    </>
  )
}

export default Assets
