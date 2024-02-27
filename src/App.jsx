import './App.css'
import Nav from './components/Nav'
import PurchaseTicket from './components/PurchaseTicket'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/purchase" element={<PurchaseTicket />} />
      </Routes>
    </div>
  )
}
export default App
