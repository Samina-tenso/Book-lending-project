import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const API_URL = "http://localhost:8080"

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
            console.log("k")
            return response.data
        } else { console.log(error.message) }
    } catch (error) {
        console.log(error.message)
    }
}



export const useAddBook = async (book) => {
    console.log(book)
    try {
        const response = await axios.post(`${API_URL}/myshelf/books/add-book`, book, { headers: authHeader() })
        if (response.status == 200) {
            console.log(response)
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const getMyBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/myshelf/:username/get-books`, { headers: authHeader() })
        if (response.status == 201) {
            console.log(response.data)
            return response.data
        }
    } catch (error) {
        console.log(error.message)
    }
}
// const BookApis = {
//     useGetBooks, authHeader
// }

