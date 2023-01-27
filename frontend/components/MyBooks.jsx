import { useEffect, useState } from "react"
import { getMyBooks } from "../api/book.api"
import { Container, Row, Col, Card } from 'react-bootstrap';

const MyBooks = () => {
    const [myBooks, setMyBooks] = useState()
    useEffect(() => {
        try {
            getMyBooks().then((response) => {
                if (response) {
                    return setMyBooks(response)
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }, [])
    return (
        myBooks ? (
            <>< h1 >My Books </h1 >
                <Container >
                    <Row>{myBooks.map((book) => (
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Img variant="top" src={book.image} />
                                </Card.Body></Card></Col>))} </Row></Container></>
        ) : <h2> no books to lend out</h2>
    )
}
export default MyBooks