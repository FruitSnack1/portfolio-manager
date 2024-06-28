import { makeAutoObservable } from 'mobx'
import { Asset, getAssets } from '../api/assets'
import { Log, getLogs } from '../api/logs'

type LogData = {
  asset: string
  deposit: number
  balance: number
  date: string
  id: string
}

type AssetData = {
  balance: number
}

type AssetDetail = {
  asset: string
  deposit: number
  balance: number
  pl: number
  plPercent: number
  share: number
}

class Store {
  assetsData: Asset[] = []
  logsData: Log[] = []

  constructor() {
    ;(async () => {
      this.assetsData = await getAssets()
      this.logsData = await getLogs()
    })()
    makeAutoObservable(this)
  }

  async fetchData() {
    this.assetsData = await getAssets()
    this.logsData = await getLogs()
    this.logsData = this.logsData.map((log) => {
      return {
        ...log,
      }
    })
    console.log('logsDate', this.logsData)
  }

  get logs(): Log[] {
    return this.logsData
  }

  get balance(): number {
    if (this.latests().length === 0) return 0
    return this.latests().reduce((a, b) => a + b.balance, 0)
  }

  private latests(): Log[] {
    const assetMap = new Map<string, Log>()

    this.logsData.forEach((item) => {
      const existingItem = assetMap.get(item.asset)
      if (!existingItem || new Date(item.date) > new Date(existingItem.date)) {
        assetMap.set(item.asset, item)
      }
    })
    return Array.from(assetMap.values())
  }

  get assets(): Asset[] {
    return this.assetsData
  }

  get profit(): number {
    return this.balance - this.deposit
  }

  get deposit(): number {
    return this.logs.reduce((a, b) => a + b.deposit, 0)
  }

  get profitPercent(): number {
    return parseFloat(((this.profit / this.deposit) * 100).toFixed(2))
  }

  assetsDetails(assetName?: string): AssetDetail[] {
    const results: AssetDetail[] = []
    for (const asset of this.assets) {
      const name = asset.name
      const deposit = this.logs
        .filter((item) => item.asset === name)
        .reduce((a, b) => a + b.deposit, 0)
      const balance =
        this.latests().find((item) => item.asset === name)?.balance ?? 0
      const pl = balance - deposit
      const share = balance / this.balance
      results.push({
        asset: name,
        deposit,
        balance,
        pl,
        plPercent: parseFloat(((pl / deposit) * 100).toFixed(1)),
        share: parseFloat((share * 100).toFixed(1)),
      })
    }
    if (assetName) return results.filter((result) => result.asset === assetName)
    return results
  }

  get shareChartData(): { label: string; value: number }[] {
    return this.assetsDetails().map(({ asset, share }) => ({
      label: asset,
      value: share,
    }))
  }

  historyChartData(percent: boolean, filter?: string): Record<string, any>[] {
    let results: Record<string, any>[] = []
    // const assets = filter ? [{ name: filter }] : this.logs
    const assets = filter
      ? this.logs.filter((log) => log.asset === filter)
      : this.logs

    for (const asset of assets) {
      const items = this.logs.filter((item) => item.asset === asset.asset)
      items.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      let lastBalance = 0
      for (const item of items) {
        let pushed = false
        const balance = item.balance - item.deposit
        let diff = ''
        if (percent) {
          diff = lastBalance
            ? ((balance / lastBalance - 1) * 100).toFixed(2)
            : '0'
        } else {
          diff = lastBalance ? (balance - lastBalance).toString() : '0'
        }
        if (lastBalance === 0) {
          lastBalance = item.balance
          continue
        }
        lastBalance = item.balance
        results.forEach((result) => {
          if (result.month === this.formatMonth(item.date)) {
            result[asset.asset] = parseFloat(diff)
            pushed = true
          }
        })
        if (!pushed) {
          results.push({
            [asset.asset]: parseFloat(diff),
            month: this.formatMonth(item.date),
          })
        }
      }
    }
    return results
  }

  private formatMonth(date: Date) {
    return `${date.getMonth() + 1}/${date.getFullYear()}`
  }

  removeLog(id: string) {}

  get balanceChartData(): Record<string, any>[] {
    let results: { month: string; balance: number }[] = []

    const dates = Array.from(
      new Set(this.logs.map((item) => item.date.toDateString()))
    )
    dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    for (const date of dates) {
      const items = this.logs.filter(
        (item) => item.date.toDateString() === date
      )
      const balance = items.reduce((a, b) => a + b.balance, 0)
      results.push({
        month: this.formatMonth(new Date(date)),
        balance: balance,
      })
    }
    for (const asset of this.assets) {
      const items = this.logs.filter((item) => item.asset === asset.name)
      items.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    }
    return results
  }

  // getAssetData(asset: string): AssetData {
  //   return {
  //     balance:
  //       this.latests().find((item) => item.asset === asset)?.balance ?? 0,
  //   }
  // }
}

const store = new Store()

export default store
