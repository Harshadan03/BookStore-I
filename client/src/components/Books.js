import React, { useState, useEffect } from 'react'
import { getBooks } from '../auth'
import Card from './Card'
import { Link } from 'react-router-dom'
import Menu from './Menu'

const Books = () => {

    const [books, setBooks] = useState([])
    const [error, setError] = useState(false)

    const loadBooks = () => {
        getBooks().then(data => {
            if (data.error) {
                setError(data.error)
                console.log(error)
            }
            else {
                setBooks(data)
            }
        })
    }

    useEffect(() => {
        loadBooks()
    }, [])

    return (
        <div className="body">
            <Menu />
            <h1>Books</h1>
            <div className="ml-5 mb-5 mt-5 ">
                <Link to="/addbook">
                    <button className="btn btn-success">Add A New Book</button>
                </Link>
            </div>
            <div className="row container" >
                {
                    books && books.map((b, i) => (
                        <div key={i} className="col-4 mb-3">
                            <Card book={b} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Books