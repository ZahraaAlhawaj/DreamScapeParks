import axios from 'axios'
import { useEffect, useState } from 'react'
import Ride from './Ride'

const Home = () => {
  const [rides, setRides] = useState([])
  const [searchRide, setSearchRide] = useState('')

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const getRides = async () => {
      const response = await axios.get(`${BASE_URL}/rides`)
      setRides(response.data)
    }
    getRides()
  }, [])

  const handleChange = (e) => {
    if (e.target.name === 'search') {
      setSearchRide(e.target.value)
    }
  }

  return (
    <div className="home">
      <div id="search-rides">
        <label for="search">Search for Rides:</label>
        <input onChange={handleChange} type="text" name="search" id="search" />
      </div>
      <h1>Rides</h1>

      <div className="rides-div">
        {rides.map(
          (ride) =>
            ride.name.toLowerCase().includes(searchRide.toLowerCase()) && (
              <Ride key={ride._id} ride={ride} />
            )
        )}
      </div>
    </div>
  )
}

export default Home
