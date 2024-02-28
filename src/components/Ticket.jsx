import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Ticket = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  let navigate = useNavigate()

  const [tickets, setTickets] = useState([])
  const [deleted, setDeleted] = useState(false)
  const [searchTicket, setSearchTicket] = useState('')

  useEffect(() => {
    getTickets()
    setDeleted(false)
  }, [deleted])

  const getTickets = async () => {
    const response = await axios.get(`${BASE_URL}/tickets`)

    response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    setTickets(response.data)
  }

  const deleteTicket = async (e, index) => {
    await axios.delete(`${BASE_URL}/tickets/${index}`)
    setDeleted(true)
  }
<<<<<<< HEAD
=======
  const handleChange = (e) => {
    if (e.target.name === 'search') {
      setSearchTicket(e.target.value)
    }
  }
>>>>>>> 38a3ee4d0041913d2032723f4015e021e4dd2293

  return (
    <div className="main-ticket">
      <div id="search-rides">
        <label for="search">Search Ticket:</label>
        <input onChange={handleChange} type="text" name="search" id="search" />
      </div>
      <div>
        <h1>All tickets</h1>
      </div>
      {tickets.map(
        (ticket, index) =>
          ticket.personName
            .toLowerCase()
            .includes(searchTicket.toLowerCase()) && (
            <div key={ticket._id} className="ticket">
              <div className="left-ticket"></div>
              <div className="right-ticket">
                <div className="personName">
                  <h4>{ticket.personName}</h4>
                </div>

                <div className="details">
                  <b>🎡Selected Rides: </b>
                  {ticket.ride.map((ride, index) => (
                    <div className="selected-rides" key={ride._id}>
                      <p>
                        {ride.name}
                        {index < ticket.ride.length - 1 && <b>-</b>}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <b>🍿Selected Food: </b>
                  {ticket.food.map((food, index) => (
                    <div key={food._id} className="selected-food">
                      <p>
                        {food.name}
                        {index < ticket.food.length - 1 && <b>-</b>}
                      </p>
                    </div>
                  ))}
                </div>
                <p>
                  <b>💲Total Cost: </b>${ticket.totalCost}
                </p>
                <button
                  id="trash"
                  onClick={(e) => {
                    deleteTicket(e, ticket._id, index)
                  }}
                >
                  <i
                    className="fa fa-trash-o"
                    style={{ fontSize: '20px', color: 'red' }}
                  ></i>
                </button>
              </div>
            </div>
          )
      )}
    </div>
  )
}

export default Ticket
