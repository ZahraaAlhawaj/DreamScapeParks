import { useState, useEffect } from 'react'
import axios from 'axios'

const purchaseTicket = () => {
  let ticket = {
    personName: '',
    email: '',
    food: [],
    ride: [],
    totalCost: 0
  }
  const [rides, setRides] = useState([])
  const [foods, setFoods] = useState([])

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const getData = async () => {
      const response1 = await axios.get(`${BASE_URL}/rides`)
      setRides(response1.data)
      const response2 = await axios.get(`${BASE_URL}/food`)
      setFoods(response2.data)
    }
    getData()
  }, [])

  const [checkedFoods, setCheckedFoods] = useState({})
  const [foodQuantity, setFoodQuantity] = useState({})
  const [checkedRides, setCheckedRides] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const BASE_URL = import.meta.env.VITE_BASE_URL
    ticket.personName = e.target.name.value
    ticket.email = e.target.email.value
    ticket.totalCost = totalPrice()
    foods.forEach((food) => {
      if (
        e.target[food.name][0] !== undefined &&
        e.target[food.name][1].value !== ''
      ) {
        ticket.food.push({
          name: e.target[food.name][0].value,
          qty: e.target[food.name][1].value
        })
      }
    })
    rides.forEach((ride) => {
      e.target[ride.name].checked && ticket.ride.push(e.target[ride.name].value)
    })

    console.log(ticket)
    await axios.post(`${BASE_URL}/tickets`, ticket)

    e.target.reset()
    setCheckedFoods({})
  }

  const handleFoodChange = (e) => {
    setCheckedFoods({
      ...checkedFoods,
      [e.target.id]: e.target.checked
    })
  }
  const handleRideChange = (e) => {
    setCheckedRides({
      ...checkedRides,
      [e.target.id]: e.target.checked
    })
  }
  const handleQuantityChange = (e) => {
    setFoodQuantity({ ...foodQuantity, [e.target.name]: e.target.value })
  }

  const totalPrice = () => {
    let total = 0
    for (const food in foodQuantity) {
      if (checkedFoods[food]) {
        const dummyFood = foods.find((dummyFood) => dummyFood.name == food)
        total += parseFloat(dummyFood.price) * parseInt(foodQuantity[food])
      }
    }

    for (const [key, value] of Object.entries(checkedRides)) {
      if (value) {
        const dummyRide = rides.find((dummyRide) => dummyRide.name === key)
        total += parseFloat(dummyRide.price)
      }
    }
    return total.toFixed(2)
  }

  const quaititylabel = () => {
    for (const [key, value] of Object.entries(checkedFoods)) {
      if (value) {
        return true
      }
    }
    return false
  }
  console.log(quaititylabel())
  return (
    <div id="ticket-form">
      <h1>Purchase Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div id="contact-details">
          <h4 className="form-element-header">Contact Details</h4>
          <div className="input-field">
            <label htmlFor="name">Name: </label>
            <input type="text" id="name"></input>
          </div>
          <div className="input-field">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email"></input>
          </div>
        </div>

        <div className="food-rides-contatiner">
          <div className="options-container">
            <h4 className="form-element-header">Food</h4>
            <div id="title">
              <div className="item-label">
                <div>&nbsp;</div>
                <div>Name</div>
                <div>Price</div>
              </div>
              {quaititylabel() && <div>Quantity</div>}
            </div>
            {foods.map((food) => (
              <div id="food" key={food._id}>
                <label htmlFor={`${food.name}`} className="item-label">
                  <input
                    type="checkbox"
                    name="food"
                    id={food.name}
                    value={food.name}
                    onChange={handleFoodChange}
                  />
                  <div>{food.name}</div>
                  <div>${food.price}</div>
                </label>
                {checkedFoods[food.name] && (
                  <input
                    type="number"
                    id={`${food.name}Qty`}
                    name={food.name}
                    min="1"
                    max="100"
                    value={foodQuantity[food.name]}
                    onChange={handleQuantityChange}
                  ></input>
                )}
              </div>
            ))}
          </div>

          <div className="options-container">
            <h4 className="form-element-header">Rides</h4>
            <div id="title">
              <div className="item-label">
                <div>&nbsp;</div>
                <div>Name</div>
                <div>Price</div>
              </div>
            </div>
            {rides.map((ride) => (
              <div id="ride" key={ride._id}>
                <label htmlFor={`${ride.name}`} className="item-label">
                  <input
                    type="checkbox"
                    name="ride"
                    id={`${ride.name}`}
                    value={ride._id}
                    onChange={handleRideChange}
                  />
                  <div>{ride.name}</div>
                  <div>${ride.price}</div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div class="center-item">
          <h3 id="totalPrice">
            Total Price: <span id="price">$ {totalPrice()}</span>{' '}
          </h3>
          <button class="button" type="submit">
            <span class="button-content">Purchase Ticket </span>
          </button>
        </div>
      </form>
    </div>
  )
}
export default purchaseTicket
