const express = require('express');
const router = express.Router();
const Book = require('../models').Book;


//GET all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.render('index', { books });
    } catch(error) {
        res.status(500).send(error)
    }
});

//renders the new book page
router.get('/new', (req, res) => {
    res.render('new-book', { book: {} })
})

//CREATES new book
router.post('/new', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.redirect('/books')
    } catch(error) {
        if (error.name === 'SequelizeValidationError') {
            const book = Book.build(req.body);
            console.error(error)
            res.render('new-book', { book, errors: error.errors}) 
        }
    }
})

//GET individual book 
router.get('/:id', async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            res.render('update-book', { book });
        } else {
            res.status(404).render('book-not-found');
        }
    } catch(error) {
        next(error)
    }
})

//UPDATE existing book
router.post('/:id', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        await book.update(req.body);
        res.redirect('/books')
    } catch(error) {
        res.status(500).send(error)
    }
})

//DELETE existing book 
router.post('/:id/delete', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        await book.destroy();
        res.redirect('/books')
    } catch(error) {
        res.status(500).send(error)
    }
})





module.exports = router;