import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore'
import { db } from '../fireapp'
import { getAuth } from 'firebase/auth'

const colRef = collection(db, 'assets')
export const getAssets = async () => {
  // const auth = getAuth()
  // if (!auth.currentUser) return []
  // console.log('getting docs', auth.currentUser.uid)
  // const q = query(collection(db, `${auth.currentUser.uid}`))
  // const docs = await getDocs(q)
  // console.log(docs)
  // const data = docs.docs.map((doc) => doc.data())
  // console.log(data)
  const auth = getAuth()
  console.log('getting docs', auth.currentUser?.uid)
  if (!auth.currentUser) return []

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const assetsCol = collection(userDoc, 'assets')
  const querySnapshot = await getDocs(assetsCol)

  const assets = querySnapshot.docs.map((doc) => doc.data())
  console.log(assets)
  return assets
}

export const addAsset = async (name: string) => {
  const auth = getAuth()
  console.log('adding docs', auth.currentUser?.uid)
  if (!auth.currentUser) return

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const assetsCol = collection(userDoc, 'assets')
  return await addDoc(assetsCol, {
    name,
  })
}
