import MyApplications from './MyApplications'
import MyBooks from './MyBooks'

const Myshelf = () => {
    return (
        <>
            <h1> My Shelf</h1>
            <MyBooks /><MyApplications />
        </>
    )
}

export default Myshelf