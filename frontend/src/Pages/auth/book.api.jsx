import axios from 'axios';


function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}

const getBooks = () => {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=james+s.a+corey&maxResults=10&projection=LITE&key=AIzaSyAkz0H-upklTtRpPWxJpwkBWY-T3BX2X0w"
    )
}

const BookApis = {
    getBooks
}

export default BookApis