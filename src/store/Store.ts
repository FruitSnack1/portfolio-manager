import { makeAutoObservable } from 'mobx'
import { data } from './data'

type LogData = {
  asset: string
  deposit: number
  balance: number
  date: string
}

type Asset = {
  name: string
  balance: number
  deposit: number
  plPercent: string
  pl: number
  share: string
}

class Store {
  data: LogData[]

  constructor(data: LogData[]) {
    makeAutoObservable(this)
    this.data = data
  }

  get filtredData() {
    return this.data.filter((item) => item.date === '2023-01-06T23:00:00.000Z')
  }

  get balance(): number {
    return this.latests().reduce((a, b) => a + b.balance, 0)
  }

  private latests(): LogData[] {
    const latestDate = this.data.reduce((a, b) => {
      return a.date > b.date ? a : b
    }).date
    return this.data.filter((item) => item.date === latestDate)
  }

  get assets(): Asset[] {
    const names = Array.from(new Set(data.map((item) => item.asset)))
    const results = []
    for (const name of names) {
      const balance =
        this.latests().find(({ asset }) => asset === name)?.balance ?? 0
      const deposit = this.data.reduce(
        (a, b) => a + (b.asset === name ? b.deposit : 0),
        0
      )
      const plPercent = ((balance / deposit - 1) * 100).toFixed(1)
      const pl = balance - deposit
      const share = ((balance / this.balance) * 100).toFixed(1)
      results.push({
        name,
        balance,
        deposit,
        plPercent,
        pl,
        share,
      })
    }
    return results
  }

  get shareChartData(): { label: string; value: number }[] {
    return this.assets.map(({ name, share }) => ({
      label: name,
      value: parseFloat(share),
    }))
  }

  get historyChartData(): Record<string, any>[] {
    let results: Record<string, any>[] = []
    const assets = this.assets

    for (const asset of assets) {
      const items = this.data.filter((item) => item.asset === asset.name)
      items.sort((a, b) => a.date.localeCompare(b.date))
      let lastBalance = 0
      for (const item of items) {
        let pushed = false
        const balance = item.balance - item.deposit
        const diff = lastBalance
          ? ((balance / lastBalance - 1) * 100).toFixed(2)
          : '0'
        if (lastBalance === 0) {
          lastBalance = item.balance
          continue
        }
        lastBalance = item.balance
        results.forEach((result) => {
          if (result.month === this.formatMonth(item.date)) {
            result[asset.name] = parseFloat(diff)
            pushed = true
          }
        })
        if (!pushed) {
          results.push({
            [asset.name]: parseFloat(diff),
            month: this.formatMonth(item.date),
          })
        }
      }
    }

    return results
  }

  private formatMonth(date: string) {
    const d = new Date(date)
    return `${d.getDate()}/${d.getFullYear()}`
  }
}

const store = new Store(data)

export default store
