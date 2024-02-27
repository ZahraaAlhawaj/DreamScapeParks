import { useState, useEffect } from 'react'
import axios from 'axios'

const Ticket = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL

  const [tickets, setTickets] = useState([])

  useEffect(() => {
    getTickets()
  })

  const getTickets = async () => {
    const response = await axios.get(`${BASE_URL}/tickets`)
    setTickets(response.data)
  }

  const deleteTicket = async (e, index) => {
    await axios.delete(`${BASE_URL}/tickets/${index}`)
  }
  return (
    <div>
      <h1>All tickets</h1>
      {tickets.map((ticket) => (
        <div key={ticket._id} className="ticket">
          <p>{ticket.personName}</p>
          <p>{ticket.totalCost}</p>
          {ticket.food.map((food) => (
            <div key={food._id}>
              <p>{food.name}</p>
            </div>
          ))}
          {ticket.ride.map((ride) => (
            <div key={ride._id}>
              <p>{ride.name}</p>
            </div>
          ))}
          <button
            id="trash"
            onClick={(e) => {
              deleteTicket(e, ticket._id)
            }}
          >
            <i
              className="fa fa-trash-o"
              style={{ fontSize: '20px', color: 'red' }}
            ></i>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Ticket
