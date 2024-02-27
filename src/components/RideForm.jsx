import { useRef } from 'react'
import axios from 'axios'
const RideForm = () => {
  const formRef = {
    name: useRef(null),
    price: useRef(null),
    pic: useRef(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const newRide = {
      name: formRef.name.current.value,
      price: formRef.price.current.value,
      pic: formRef.pic.current.value
    }
    await axios.post(`${BASE_URL}/rides`, newRide)
    e.target.reset()
  }

  return (
    <div>
      <h3 className="form-title">Add Ride Form</h3>
      <form onSubmit={handleSubmit} className="add-form">
        <label htmlFor="name">Ride Name</label>
        <input id="name" type="text" ref={formRef.name} />
        <label htmlFor="price">Price</label>
        <input id="price" type="number" ref={formRef.price} />
        <label htmlFor="pic">Picture</label>
        <input id="pic" type="text" ref={formRef.pic} />
        <button type="submit">Add Ride</button>
      </form>
    </div>
  )
}

export default RideForm
