import { useState, useRef, useEffect } from 'react'
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
        total += parseInt(dummyRide.price)
      }
    }
    return total.toFixed(2)
  }

  return (
    <div id="ticket-form">
      <h1>Purchase Ticket</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name"></input>
        <h4>Food: </h4>
        <div className="options-container">
          {foods.map((food) => (
            <div id="food" key={food._id}>
              <label htmlFor={`${food.name}`}>
                <input
                  type="checkbox"
                  name="food"
                  id={food.name}
                  value={food.name}
                  onChange={handleFoodChange}
                />
                {food.name} - {food.price} $
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
        <h4>Rides: </h4>
        <div className="options-container">
          {rides.map((ride) => (
            <label htmlFor={`${ride.name}`} key={ride._id}>
              <input
                type="checkbox"
                name="ride"
                id={`${ride.name}`}
                value={ride._id}
                onChange={handleRideChange}
              />
              {ride.name} - {ride.price} $
            </label>
          ))}
        </div>
        <h3 id="totalPrice">Total Price: {totalPrice()} </h3>
        <button type="submit"> Submit</button>
      </form>
    </div>
  )
}
export default purchaseTicket
