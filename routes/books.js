const express = require('express');
const router = express.Router();
const Book = require('../models').Book;


// retrieves full list of books
router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.render('index', { books });
    } catch(error) {
        res.status(500).send(error)
    }
});

module.exports = router;