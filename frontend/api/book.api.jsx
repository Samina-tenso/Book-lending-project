import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}

export const useGetBooks = async () => {
    try {
        const response = await axios.get("https://www.googleapis.com/books/v1/volumes?q=james+s.a+corey&maxResults=10&key=AIzaSyAkz0H-upklTtRpPWxJpwkBWY-T3BX2X0w")
        if (response.data) {
            return response.data
        } else { console.log(error.message) }
    } catch (error) {
        console.log(error.message)
    }
}

export const useAddBook = async (book) => {
    console.log(book)
    try {
        const response = await axios.post(`${API_URL}/my-shelf/:username/books/add-book`, book, { headers: authHeader() })
        if (response.status == 201) {
            console.log(response)
        } else { console.log(error.message) }
    } catch (error) {
        console.log(error.message)
    }
}

export const getMyBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/my-shelf/:username/get-books`, { headers: authHeader() })
        if (response.status == 201) {
            console.log(response.data)
            return response.data
        } else { console.log(error.message) }
    } catch (error) {
        console.log(error.message)
    }
}

export const getAvailableBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/my-shelf/:username/get-books-available`, { headers: authHeader() })
        if (response) {
            console.log(response.data)
            return response.data
        } else { console.log(error.message) }
    } catch (error) {
        console.log(error.message)
    }
}
//auth does not go through postman works
export const findUsersBook = async (id) => {
    console.log(id)
    try {
        const response = await axios.get(`${API_URL}/my-shelf/:username/find-lenders/${id}`, { headers: authHeader() })
        if (response.status == 201) {
            return response.data
        } else { console.log(error.message) }
    } catch (error) {
        console.log(error.message)
    }
}

//get applications with username
export const getUserApplications = async () => {
    try {
        const response = await axios.get(`${API_URL}/my-shelf/:username/get-applications`, { headers: authHeader() })
        if (response.status == 201) {
            return response.data
        } else { console.log(error.message) }
    } catch (error) {
        console.log(error.message)
    }
}