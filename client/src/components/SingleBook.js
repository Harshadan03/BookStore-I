import React, { useState, useEffect } from 'react'
import { readSingleBookFromApi } from '../auth'
import ShowImage from './ShowImage'
import Menu from './Menu'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Book = props => {

    const [book, setBook] = useState({})
    const [error, setError] = useState(false)

    const loadSingleBookById = (bookId) => {
        readSingleBookFromApi(bookId).then(data => {
            if (data.error) {
                setError(data.error)
                console.log(error)
            }
            else {
                setBook(data)
            }
        })
    }



    useEffect(() => {
        //get the product id from the url 
        const bookId = props.match.params.bookId
        loadSingleBookById(bookId)
    }, [])

    return (
        <div className="body">
            <Menu />
            <div className="card container mt-5 mb-10">
                <h1 className="card-header card-header-1 name">{book.name}</h1>
                <div className="card-body">

                    <ShowImage item={book} url="Book" />
                    <p className="card-p  mt-2 black-10">{book.description} </p>
                    <p className="card-p  mt-2 black-9">Author :{book.author} </p>
                    <p className="black-8">Added on {moment(book.createdAt).fromNow()}</p>

                </div>
            </div>
        </div>

    )
}

export default Book