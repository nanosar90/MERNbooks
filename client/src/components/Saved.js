import React, {useEffect, useState} from 'react'
import { Button, Container, Row, Col, Input, Link } from 'reactstrap';
import { getSaveBooks, deleteBook } from '../utils/helper'

export default function Saved() {
    const [savedBooks, setSavedBooks] = useState([])

    useEffect(() => {
        const getBooks = getSaveBooks()
        getBooks
            .then((results) => { 
                console.log(results)
                return results.data.data
            })
            .then((results) => { 
                console.log(results)
                setSavedBooks(results)
             })
            .catch((err) => {
                console.log(`An error occurred: ${err}`)
            })
    }, [])

    const handleDelete = (dataId) => {
        console.log("dataId: ", dataId)
        let bookDeleted = deleteBook(dataId)
        bookDeleted
            .then((data) => {
                console.log(data)
                const getBooks = getSaveBooks()
                getBooks
                    .then((results) => {
                        console.log(results)
                        return results.data.data
                    })
                    .then((results) => {
                        console.log(results)
                        setSavedBooks(results)
                    })
                    .catch((err) => {
                        console.log(`An error occurred: ${err}`)
                    })
             })
            .catch((err) => {
                console.log(err)
             })
     }
    return (
        <div>
            <h1>Saved</h1>
            <div id="" className="search">
                <div id="" className="results">
                    <Container fluid="lg" className="bookholder">
                        {(savedBooks.length > 0) && savedBooks.map((book, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <Row className="bookholder-items">
                                        <Row className="book-title-buttons">
                                            <Col><span><h5>Title: {book.title}</h5></span></Col>
                                            <Col className="col-1 offset-sm-1"><Button href={book.link} target="_blank" color="primary">View</Button></Col>
                                            <Col className="col-4"><Button onClick={() => { handleDelete(book._id) }}>Delete</Button></Col>
                                        </Row>
                                        <Row>
                                            <Col>Author: {book.authors.map((auth, ix) => {
                                                return (
                                                    <h5 key={ix}> {auth} </h5>
                                                )
                                            })}</Col>
                                        </Row>
                                        <Row >
                                            <Col className="col-2">
                                                {<img src={book.image} alt={book.image} />}
                                            </Col>
                                            <Col id="" className="col-10">
                                                <p>{book.description}</p>
                                            </Col>
                                        </Row>
                                    </Row>
                                </React.Fragment>
                            )
                        })}
                    </Container>
                </div>
            </div>
        </div>
    )
}
