import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();
export const useAuth = (formData) => {
    console.log(formData)
    //[user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();
    //make axios call
    //call to login 
    function login() {
        console.log("jk")
        try {
            axios.post("http://localhost:8080/auth/signin", { formData }).then((response) => {
                const data = response.data
                console.log(data)
            })
        } catch (error) {
            console.log(error)
        }

    }

    return { login }
}



