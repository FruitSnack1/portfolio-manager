import { initializeApp } from 'firebase/app'
import 'firebase/auth'

const {
  REACT_APP_APIKEY,
  AUTHDOMAIN,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
} = process.env
console.log(REACT_APP_APIKEY)

const firebaseConfig = {
  apiKey: REACT_APP_APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
}
export const fbApp = initializeApp(firebaseConfig)
console.log('app initialized 2')
