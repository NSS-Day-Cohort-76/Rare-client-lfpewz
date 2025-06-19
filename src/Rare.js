// import { useState } from "react"
// import { ApplicationViews } from "./views/ApplicationViews"
// import { NavBar } from "./components/nav/NavBar"


// export const Rare = () => {
//   const [token, setTokenState] = useState(localStorage.getItem('auth_token'))

//   const setToken = (newToken) => {
//     localStorage.setItem('auth_token', newToken)
//     setTokenState(newToken)
//   }

//   return <>
//     <NavBar token={token} setToken={setToken} />
//     <ApplicationViews token={token} setToken={setToken} />
//   </>
// }


import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"

export const Rare = () => {
  // Parse the user object from localStorage, or use null if not present
  const [user, setUserState] = useState(() => {
    const stored = localStorage.getItem('rare_user')
    return stored ? JSON.parse(stored) : null
  })

  // Store the user object in localStorage and update state
  const setUser = (newUser) => {
    localStorage.setItem('rare_user', JSON.stringify(newUser))
    setUserState(newUser)
  }

  return <>
    <NavBar user={user} setUser={setUser} />
    <ApplicationViews user={user} setUser={setUser} />
  </>
}