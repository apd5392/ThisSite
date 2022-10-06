import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './navigation.styles.css'
import UserDropDown from '../User-dropdown/User-dropdown.component'
import { useContext, useState } from 'react'

import { UserContext } from '../../contexts/user.context'

const Navigation = () => {
  const { user, setUser } = useContext(UserContext)
  const [toggleuser, setToggleuser] = useState(false)

  const toggleUserIcon = () => {
    setToggleuser(!toggleuser)
  }
  const getUser = async (e) => {
    e.preventDefault()
    const payload = await SignInUser({ userName: 'CC', password: 'abc1234' })
    console.log(payload)
    setUser(payload)
    toggleAuthenticated(true)
    navigate(`/`)
  }

  return (
    <Fragment>
      <div className="navigation">
        <div className={`logo-container ${user ? 'login' : ''}`}>
          <Link to="/">
            <img src={logo} />
            <h1 className="Title">.ThisSite</h1>
          </Link>
        </div>

        <div className="nav-links-container">
          <h2 onClick={getUser}>Login existing User</h2>
          <Link className="nav-link" to="/">
            Home
          </Link>
          {user ? (
            <i class="fa-solid fa-user user-icon" onClick={toggleUserIcon}></i>
          ) : (
            ''
          )}
          {user ? (
            ''
          ) : (
            <Link className="nav-link" to="/auth">
              Sign In
            </Link>
          )}
        </div>
        {toggleuser && (
          <UserDropDown setToggleuser={setToggleuser} Toggleuser={toggleuser} />
        )}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
