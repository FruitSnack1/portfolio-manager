import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [auth])

  return isLoggedIn
}

export default useIsLoggedIn
