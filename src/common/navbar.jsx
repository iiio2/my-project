import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-sm navbar-light bg-light'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/'>
          Posts
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <NavLink
              className='nav-link nav-item'
              aria-current='page'
              to='/users'
            >
              User Profile
            </NavLink>

            <NavLink className='nav-item nav-link' to='/all-users'>
              All Users
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
