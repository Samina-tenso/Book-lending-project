
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL

const signup = async (formData) => {
    try {
        console.log(formData)
        return axios.post(API_URL + "/signup", formData).then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data))
                return response.data
            } else {
                console.log(error.message)
                return response.data
            }
        });
    } catch (error) {
        console.log(error.message)
    }
}

const signin = async (formData) => {
    try {
        console.log(formData)
        return axios.post(API_URL + "/signin", formData).then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data))
                return response.data
            } else {
                console.log(error.message)
                return response.data
            }
        });

    } catch (error) {
        console.log(error.message)
    }

};

const logout = () => {
    localStorage.removeItem("user")
}


const Auth = {
    signin,
    signup,
    logout
}

export default Auth; 