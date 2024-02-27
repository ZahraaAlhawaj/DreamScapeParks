import { useRef } from 'react'
import axios from 'axios'

const FoodForm = () => {
  const formRef = {
    name: useRef(null),
    price: useRef(null),
    pic: useRef(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const newFood = {
      name: formRef.name.current.value,
      price: formRef.price.current.value,
      pic: formRef.pic.current.value
    }
    await axios.post(`${BASE_URL}/food`, newFood)
    e.target.reset()
  }

  return (
    <div>
      <h3 className="form-title">Add Food Form</h3>
      <form onSubmit={handleSubmit} className="add-form">
        <label htmlFor="name">Food Name</label>
        <input id="name" type="text" ref={formRef.name} />
        <label htmlFor="price">Price</label>
        <input id="price" type="number" ref={formRef.price} />
        <label htmlFor="pic">Picture</label>
        <input id="pic" type="text" ref={formRef.pic} />
        <button type="submit">Add Food</button>
      </form>
    </div>
  )
}

export default FoodForm
