import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Ticket = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  let navigate = useNavigate()

  const [tickets, setTickets] = useState([])
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    getTickets()
    setDeleted(false)
  }, [deleted])

  const getTickets = async () => {
    const response = await axios.get(`${BASE_URL}/tickets`)
    tickets.current = response.data
    //setTickets(response.data)
  }


  const deleteTicket = async (e, index) => {
    await axios.delete(`${BASE_URL}/tickets/${index}`)
    setDeleted(true)
  }
  return (
    <div className="main-ticket">
      <div>
        <h1>All tickets</h1>
      </div>
      {console.log('s', tickets.current)}
      {tickets.current.map((ticket, index) => (
        <div key={ticket._id} className="ticket">
          <div className="left-ticket">
            <img
              className="img-ticket"
              src="https://i.pinimg.com/564x/ac/16/c9/ac16c97b9c019400836816f27f06219e.jpg"
              alt=""
            />
          </div>
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
      ))}
    </div>
  )
}

export default Ticket
