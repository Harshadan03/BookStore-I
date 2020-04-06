export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else {
        return false
    }
}


export const signup = (user) => {
    //console.log(name, email, password)
    //fetch is avilable with browser by default
    //used to call api's
    //here we are calling the api for signup to send the data to the database
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

export const signin = (user) => {
    //console.log(name, email, password)
    //fetch is avilable with browser by default
    //used to call api's
    //here we are calling the api for signin to send the data to the database
    return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const signout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next()
        return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
            method: "GET"
        })
            .then(response => { console.log("signout ", response) })
            .catch(err => console.log(err))
    }
}


export const getBooks = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/books`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        }).catch(err => console.log(err))
}


//get singl book by id from backend
export const readSingleBookFromApi = (bookId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/book/${bookId}`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//create book
export const createbook = (token, book) => {
    return fetch(`${process.env.REACT_APP_API_URL}/book/create`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: book // form data bcz content type is form
    }).then(response => { return response.json() })
        .catch(err => { console.log(err) })

}

