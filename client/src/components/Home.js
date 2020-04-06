import React, { Fragment } from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'


const Home = () => {

    return (
        <Fragment>
            <div className="body">
                <Menu />
                <h1>Welcome To Bookstore</h1>
                <div className="text-center" style={{ color: "white" }}>

                    <h3>Get A Brief information About Books</h3>
                    <p>Go to books Tab And Explore The Books</p>
                    {
                        localStorage.getItem('jwt') && (<Link to="/books">Books</Link>)
                    }

                </div>
            </div>
        </Fragment>
    )
}

export default Home 