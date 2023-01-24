import MyBooks from "./MyBooks"
import { Outlet } from "react-router-dom"
const Myshelf = () => {

    return (
        <>
            <h1> myshelf</h1>
            <MyBooks />
        </>
    )
}

export default Myshelf