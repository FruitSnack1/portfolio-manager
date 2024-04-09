import { makeAutoObservable } from 'mobx'

class LoginStore {
  loggedIn: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  login() {
    this.loggedIn = true
    console.log('logged in')
  }

  logout() {
    this.loggedIn = false
    console.log('logged out')
  }
}
const loginStore = new LoginStore()
export default loginStore
