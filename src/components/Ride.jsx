const Ride = ({ ride }) => {
  return (
    <div className="ride">
      <img src={ride.pic} alt={ride.name} className="ride-img" />
      <h3>{ride.name}</h3>
      <h4>Cost: ${ride.price}</h4>
    </div>
  )
}

export default Ride
