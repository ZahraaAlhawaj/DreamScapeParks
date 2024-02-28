import { NavLink } from 'react-router-dom'
const Nav = () => {
  return (
    <nav className="navbar">
      {
        <NavLink to="/">
          <img src="https://i.imgur.com/ktzQdvk.png" alt="logo" />
        </NavLink>
      }

      <div className="nav-links">
        {<NavLink to="/">Home</NavLink>}
        {<NavLink to="/purchase">Purcase Tickets</NavLink>}
        {<NavLink to="/tickets">Tickets</NavLink>}
        {<NavLink to="/add">Add</NavLink>}
        {<NavLink to="/about">About</NavLink>}
      </div>
    </nav>
  )
}

export default Nav
