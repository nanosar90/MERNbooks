import axios from 'axios'

const getBooks = (searchTerm) => {
    const url = 'https://www.googleapis.com/books/v1/volumes'
    let searchUrl = `${url}?q=${searchTerm}&key=${process.env.REACT_APP_BOOK_API_KEY}`
    return axios.get(searchUrl)
}

const postBooks = (bodyData) => { 
   return axios.post('/api/books', bodyData)
}

const getSaveBooks = () => {
    return axios.get('/api/books')
}

const deleteBook = (id) => {
    return axios.delete(`/api/books/${id}`, {
        data: {
            "_id": id
        }
    })
}

export {
    getBooks,
    postBooks,
    getSaveBooks,
    deleteBook
}