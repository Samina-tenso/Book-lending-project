import { useEffect, useState } from "react"
import { getAvailableBooks } from "../api/book.api"
import { findUsersBook } from "../api/book.api"
import { Container, Col, Row, Card, Button } from 'react-bootstrap'

const BooksToLend = () => {
    const [books, setBooks] = useState()
    const [message, setMessage] = useState()
    useEffect(() => {
        getAvailableBooks().then((response) => {
            console.log(response)
            setBooks(response)
            setMessage('')
        })
    }, [])

    const lendBook = (e, id, title) => {
        e.preventDefault()
        findUsersBook(id).then((response) => {
            console.log(response.lender_id)
            //lender id not working
            setMessage(`Application has been sent to lender: ${response.lender_id} for book title: ${title}`)
        })
    }
    return (

        books ? (
            <>< h1 > Books to lend </h1 >
                {message && <h2>{message}</h2>}
                <Container fluid>
                    <Row>{books.map((book) => (
                        <Col >
                            <Card>
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Img variant="top" src={book.image} />
                                    <Button onClick={e => lendBook(e, book.id, book.title)}>Lend book</Button >
                                </Card.Body></Card></Col>))} </Row></Container></>
        ) : <h2> No books to lend out</h2>
    )
}

export default BooksToLend