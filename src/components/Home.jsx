import axios from 'axios'
import { useEffect, useState } from 'react'
import Ride from './Ride'

const Home = () => {
  const [rides, setRides] = useState([])

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const getRides = async () => {
      const response = await axios.get(`${BASE_URL}/rides`)
      setRides(response.data)
    }
    getRides()
  }, [])

  return (
    <div className="home">
      <h1>Rides</h1>
      <div className="rides-div">
        {rides.map((ride) => (
          <Ride key={ride._id} ride={ride} />
        ))}
      </div>
    </div>
  )
}

export default Home
