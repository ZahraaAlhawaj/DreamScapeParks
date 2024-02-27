import './App.css'

import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import PurchaseTicket from './components/PurchaseTicket'
import Home from './components/Home'
import About from './components/About'
import AddPage from './components/AddPage'
import Ticket from './components/Ticket'

const App = () => {
  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/purchase" element={<PurchaseTicket />} />
          <Route path="/tickets" element={<Ticket />} />
        </Routes>
      </main>
    </div>
  )
}
export default App
