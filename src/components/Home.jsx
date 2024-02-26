import axios from 'axios'
import { useEffect, useState } from 'react'

const Home = () => {
  const [rides, setRides] = useState([])

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const getRides = async () => {
      const response = await axios.get(`${BASE_URL}/rides`)
      setRides(response.data.result)
    }
    getRides()
  }, [])

  return (
    <div>
      <h1>Rides</h1>
    </div>
  )
}

export default Home
