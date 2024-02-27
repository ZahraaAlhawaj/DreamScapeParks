import dummyFoodArray from '../Data/food'
import dummyRidesArray from '../Data/rides'
import { useState } from 'react'

const purchaseTicket = () => {
  let ticket = {
    personName: '',
    food: [],
    rides: [],
    totalCost: 0
  }

  const [checkedFoods, setCheckedFoods] = useState({})
  const [foodQuantity, setFoodQuantity] = useState({})
  const [checkedRides, setCheckedRides] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    ticket.personName = e.target.name.value
    ticket.totalCost = totalPrice()
    dummyFoodArray.forEach((food) => {
      e.target[food.name].checked && ticket.food.push(e.target[food.name].value)
    })
    dummyRidesArray.forEach((ride) => {
      e.target[ride.name].checked &&
        ticket.rides.push(e.target[ride.name].value)
    })
    e.target.reset()
    console.log(ticket)
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
        const dummyFood = dummyFoodArray.find(
          (dummyFood) => dummyFood.name == food
        )
        total += parseFloat(dummyFood.price) * parseInt(foodQuantity[food])
      }
    }

    for (const [key, value] of Object.entries(checkedRides)) {
      if (value) {
        const dummyRide = dummyRidesArray.find(
          (dummyRide) => dummyRide.name === key
        )
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
          {dummyFoodArray.map((food) => (
            <div id="food" key={food.id}>
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
          {dummyRidesArray.map((ride) => (
            <label htmlFor={`${ride.name}`} key={ride.id}>
              <input
                type="checkbox"
                name="ride"
                id={`${ride.name}`}
                value={ride.name}
                onChange={handleRideChange}
              />
              {ride.name} - {ride.price} $
            </label>
          ))}
        </div>
        <h3>Total Price: {totalPrice()} </h3>
        <button type="submit"> Submit</button>
      </form>
    </div>
  )
}
export default purchaseTicket
