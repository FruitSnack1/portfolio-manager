import { makeAutoObservable } from 'mobx'
// import { data } from './data'
import { randomUUID } from 'crypto'
import { v4 as uuid } from 'uuid'

type LogData = {
  asset: string
  deposit: number
  balance: number
  date: string
  id: string
}

export type Asset = {
  name: string
  balance: number
  deposit: number
  plPercent: string
  pl: number
  share: string
}

type AssetData = {
  balance: number
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
    const names = Array.from(new Set(this.data.map((item) => item.asset)))
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

  historyChartData(percent: boolean, filter?: string): Record<string, any>[] {
    let results: Record<string, any>[] = []
    const assets = filter ? [{ name: filter }] : this.assets

    for (const asset of assets) {
      const items = this.data.filter((item) => item.asset === asset.name)
      items.sort((a, b) => a.date.localeCompare(b.date))
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
    return `${d.getMonth() + 1}/${d.getFullYear()}`
  }

  get balanceChartData(): Record<string, any>[] {
    let results = []
    const dates = Array.from(new Set(this.data.map((item) => item.date)))
    for (const date of dates) {
      const items = this.data.filter((item) => item.date === date)
      const balance = items.reduce((a, b) => a + b.balance, 0)
      results.push({
        month: this.formatMonth(date),
        balance,
      })
    }
    return results
  }

  getAssetData(asset: string): AssetData {
    return {
      balance:
        this.latests().find((item) => item.asset === asset)?.balance ?? 0,
    }
  }

  remove(id: string): void {
    console.log('remove', id)
    const newData = this.data.filter((item) => item.id !== id)
    console.log(newData)
    localStorage.setItem('data', JSON.stringify(newData))
    this.data = newData
  }

  add(asset: string, date: string, deposit: number, balance: number): void {
    this.data.push({
      asset,
      deposit,
      balance,
      date,
      id: uuid(),
    })

    localStorage.setItem('data', JSON.stringify(this.data))
  }
}

const store = new Store(JSON.parse(localStorage.getItem('data') ?? '[]'))

export default store
