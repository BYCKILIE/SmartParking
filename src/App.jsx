import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import HomePage from './Pages/HomePage'
import Reservation from './Pages/Reservation'
import Payment from './Pages/Payment'
import Contact from './Pages/Contact'
import Account from './Pages/Account'
import { DataProvider } from './DataContext'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <DataProvider>
          <Routes>
            <Route exact path='/' Component={HomePage} />
            <Route path='/login' Component={Login} />
            <Route path='/signup' Component={Signup} />
            <Route path='/homePage' Component={HomePage} />
            <Route path='/reservation' Component={Reservation}/>
            <Route path='/payment' Component={Payment}/>
            <Route path='/contact' Component={Contact} />
            <Route path='/account' Component={Account} />
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
