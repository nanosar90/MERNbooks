import React, { useState, useEffect } from 'react'
import { Button, Container, Row, Col, Input,Link } from 'reactstrap';
import { getBooks, postBooks } from '../utils/helper'

export default function Search() {
    const [search, setSearch] = useState('')
    const [books, setBooks] = useState([])

    const handleOnChange = (evt) => {
        evt.preventDefault()
        console.log('evt.target.value', evt.target.value);
        setSearch(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        let results = getBooks(search)
        console.log('====================================');
        console.log(results);
        console.log('====================================');
        results
            .then((bookData) => {
                console.log('====================================');
                console.log(bookData.data.items);
                console.log('====================================');
                setBooks((prev) => { 
                    return [...bookData.data.items]
                })
                setSearch('')
            })
            .catch((err) => {
                console.log(`An error occurdd: ${err}`)
            })
    }

    const handleSave = (bookIdx) => {
        console.log("The Text:", bookIdx)
        console.log('====================================');
        console.log(books[bookIdx]);
        console.log('====================================');
        let bodyObj = {
            title: books[bookIdx].volumeInfo.title,
            authors: [...books[bookIdx].volumeInfo.authors],
            description: books[bookIdx].volumeInfo.description,
            image: books[bookIdx].volumeInfo.imageLinks.smallThumbnail,
            link: books[bookIdx].volumeInfo.previewLink,
            bookId: books[bookIdx].id
        }

        console.log('bodyObj: ', bodyObj);

        postBooks(bodyObj)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
     }


    return (
        <div>
            {/* <h1>Search</h1> */}
            <div id="" className="search">
                <h2>Book Search</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="books"></label>
                    <Row>
                        <Col md={4}>
                            <Input type="text" value={search} name="books" placeholder="Search" id="books" onChange={handleOnChange} />
                        </Col>
                        <Col>
                            <Button type="submit">Search</Button>
                        </Col>
                    </Row>

                </form>
                <div id="" className="results">
                    <Container fluid="lg" className="bookholder">
                        {(books.length > 0) && books.map((book, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <Row className="bookholder-items">
                                        <Row className="book-title-buttons">
                                            <Col><span><h5>Title: {book.volumeInfo.title}</h5></span></Col>
                                            <Col className="col-1 offset-sm-1"><Button href={book.volumeInfo.previewLink} target="_blank" color="primary">View</Button></Col>
                                            <Col className="col-4"><Button onClick={() => { handleSave(idx)}}>Save</Button></Col>
                                        </Row>
                                        <Row>
                                            <Col>Author: {book.volumeInfo.authors.map((auth, ix) => {
                                                return (
                                                    <h5 key={ix}> {auth} </h5>
                                                )
                                            })}</Col>
                                        </Row>
                                        <Row >
                                            <Col className="col-2">
                                                {<img src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.imageLinks.smallThumbnail} />}
                                            </Col>
                                            <Col id="" className="col-10">
                                                <p>{book.volumeInfo.description}</p>
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
