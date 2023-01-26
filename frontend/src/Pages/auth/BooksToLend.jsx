import { useEffect, useState } from "react"
import { getAvailableBooks } from "./book.api"
import { findUsersBook } from "./book.api"
import { Container, Col, Row, Card, Button } from 'react-bootstrap'

const BooksToLend = () => {
    const [books, setBooks] = useState()
    useEffect(() => {
        getAvailableBooks().then((response) => {
            console.log(response)
            setBooks(response)
        })
    }, [])

    const lendBook = (e, id) => {
        findUsersBook(id).then((response) => {
            console.log(response)
        })
    }
    return (
        books ? (
            <>< h1 > Books to lend </h1 >
                <Container fluid>
                    <Row>{books.map((book) => (
                        <Col >
                            <Card className='m-2'>
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Img variant="top" src={book.image} />
                                    <Button onClick={e => lendBook(e, book.id)}>Lend book</Button >
                                </Card.Body></Card></Col>))} </Row></Container></>
        ) : <h2> No books to lend out</h2>
    )
}

export default BooksToLend