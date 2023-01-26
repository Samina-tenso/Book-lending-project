import { useEffect, useState } from "react"
import { Row, Container, Col, Card, Button } from 'react-bootstrap'
import { useAddBook, useGetBooks } from './book.api'

const Books = () => {
    const [books, setBooks] = useState()
    const [message, setMessage] = useState()

    useEffect(() => {
        useGetBooks().then((response) => {
            console.log(response.items)
            setBooks(response.items)
            console.log(books)
        })
    }, [])

    const AddBook = (e, title, isbNo, author, description, image) => {
        e.preventDefault()
        console.log(title)
        const book = {
            title: title,
            isbnNo: isbNo,
            genre: 'Scifi',
            author: author,
            description: description,
            image: image
        }
        try {

            useAddBook(book).then((response) => {
                if (response)
                    console.log(response)
                return setMessage(`Book titled: ${title} has been added to your books`)
            }) //send req to create book for user

        } catch (error) {
            console.log(error.message)
        }
    }
    console.log(books)
    return (
        <>
            <h1> Books </h1>
            {books ?
                <Container >
                    <h2> {message}</h2>
                    <Row>{books.map((book) => <Col sm={3}>
                        <Card className='m-2'>
                            <Card.Body>
                                <Card.Title>{book.volumeInfo.title}</Card.Title>
                                <Card.Img variant="top" src={`${book.volumeInfo.imageLinks.thumbnail}`} />
                                <Button onClick={e => AddBook(e, book.volumeInfo.title, book.volumeInfo.industryIdentifiers[0].identifier, book.volumeInfo.authors[0], book.volumeInfo.description, book.volumeInfo.imageLinks.thumbnail)}>
                                    Add to My Books</Button></Card.Body></Card></Col>)}
                    </Row>
                </Container>
                : null}
        </>
    )
}

export default Books;

