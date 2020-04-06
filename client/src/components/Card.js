import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment'

const Card = ({ book }) => {



    return (
        <div className="card ">
            <div className="card-header card-header-1 name">{book.name}</div>
            <div className="card-body">

                <ShowImage item={book} url="Book" />
                <p className="card-p  mt-2 black-10">{`${book.description.substring(0, 30)}...`} </p>
                <p className="card-p  mt-2 black-9">Writer:{book.author} </p>
                <p className="black-8">Added on {moment(book.createdAt).fromNow()}</p>
                <br />
                <Link to={`/book/${book._id}`} className="mr-2">
                    <button className="btn btn-primary mt-2 mb-2 card-btn-1">View Book</button>
                </Link>
            </div>
        </div>
    );
};

export default Card;