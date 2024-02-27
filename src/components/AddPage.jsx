import { useState, useEffect } from 'react'
import RideForm from './RideForm'
import FoodForm from './FoodForm'
const AddPage = () => {
  const [form, setForm] = useState('ride')
  const [selectedForm, setSelectedForm] = useState(null)

  useEffect(() => {
    let selectedForm
    switch (form) {
      case 'ride':
        setSelectedForm(<RideForm />)
        break
      case 'food':
        setSelectedForm(<FoodForm />)
      default:
        break
    }
  }, [form])

  const toggleForm = (event) => {
    event.target.value === 'ride' ? setForm('ride') : setForm('food')
  }

  return (
    <div className="add-page">
      <section className="toggle-buttons">
        <button onClick={toggleForm} value="ride">
          Ride
        </button>
        <button onClick={toggleForm} value="food">
          Food
        </button>
      </section>
      <section className="form-section">{selectedForm}</section>
    </div>
  )
}

export default AddPage
