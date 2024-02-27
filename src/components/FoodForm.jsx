import { useRef } from 'react'
import axios from 'axios'

const FoodForm = () => {
  const formRef = {
    name: useRef(null),
    price: useRef(null),
    pic: useRef(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      name: formRef.name.current.value,
      price: formRef.price.current.value,
      pic: formRef.pic.current.value
    })
    e.target.reset()
  }

  return (
    <div>
      Food Form
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Food</label>
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
