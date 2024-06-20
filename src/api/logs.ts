import { addDocsToCollection, getDocsFromCollection } from './api'

export type Log = {
  id: string
  assetId: string
  date: Date
  deposit: number
  balance: number
}

export const getLogs = async (): Promise<Log[]> => {
  const docs = await getDocsFromCollection('logs')
  const logs = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date.toDate(),
  }))

  return logs as Log[]
}

export const addLog = async (
  assetId: string,
  date: Date,
  deposit: number,
  balance: number
): Promise<void> => {
  await addDocsToCollection('logs', {
    assetId,
    date,
    deposit,
    balance,
  })
  return
}
