import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    }
    else {
        return { color: '#ffffff' }
    }
}

const Menu = ({ history }) => (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

        <ul className="navbar-nav" >

            <div className="nav-item ">
                <Link className="nav-link" to="/" >Bookstore</Link>
            </div>
            {!isAuthenticated() ? (
                <Fragment>
                    <li className="nav-item" >
                        <Link className="nav-link" to="/login" style={isActive(history, "/login")}>Login</Link>

                    </li>
                    <li className="nav-item" >
                        <Link className="nav-link" to="/register" style={isActive(history, "/register")}>Register</Link>
                    </li>
                </Fragment>
            ) : (
                    <Fragment>
                        <li className="nav-item" >
                            <Link className="nav-link" to="/books" style={isActive(history, "/books")}>Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="" style={{ cursor: 'pointer', color: '#ffffff' }}
                                onClick={() =>
                                    signout(() => {
                                        history.push('/')
                                    })
                                } >SignOut</Link>

                        </li>
                    </Fragment>
                )}


        </ul>
    </nav>
)

export default withRouter(Menu)