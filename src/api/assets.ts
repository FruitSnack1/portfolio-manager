import { addDocsToCollection, getDocsFromCollection } from './api'

export type Asset = {
  id: string
  name: string
}

export const getAssets = async (): Promise<Asset[]> => {
  const docs = await getDocsFromCollection('logs')
  const logs = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return logs as Asset[]
}

export const addAsset = async (name: string) => {
  addDocsToCollection('assets', { name })
}
