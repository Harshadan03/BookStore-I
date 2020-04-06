import React, { Fragment, useState, useEffect } from 'react'
import Menu from './Menu'
import { isAuthenticated, createbook } from '../auth'

const AddBook = () => {

    const { user, token } = isAuthenticated()



    const [values, setValues] = useState({
        name: "",
        description: "",
        author: "",
        photo: "",
        loading: false,
        error: "",
        createdBook: '',
        formData: ""
    })

    const { name,
        description,
        author,
        photo,
        loading,
        error,
        createdBook,
        formData } = values

    const init = () => {
        setValues({ ...values, formData: new FormData() })
    }

    useEffect(() => {
        init()
    }, [])

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdBook ? '' : 'none' }}>
            <h2>{`${createdBook}`} is Added!</h2>
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h4>Loading...</h4>
            </div>)
    )

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: "", loading: true })
        createbook(token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        photo: "",
                        author: "",
                        loading: false,
                        createdBook: data.name
                    })
                }
            })
    }

    const bookForm = () => (
        <div className="body">
            <Menu />
            <div className="login-page">
                <div className="form">
                    <form className="register-form" onSubmit={clickSubmit}>
                        <p>Name</p>
                        <input type="text" onChange={handleChange('name')} value={name} placeholder="name" required />
                        <p>Author</p>
                        <input type="text" onChange={handleChange('author')} value={author} placeholder="author" required />
                        <p>Description</p>
                        <textarea type="text" placeholder="description" onChange={handleChange('description')} value={description} required />
                        <p>Book Cover</p>
                        <input type="file" onChange={handleChange('photo')} name="photo" accept="image/*" />
                        <button className="btn btn-primary" >Add</button>
                    </form>
                </div>
            </div>
        </div>
    )


    return (
        <Fragment>
            {showLoading()}
            {showError()}
            {showSuccess()}
            {bookForm()}
        </Fragment>
    )
}

export default AddBook