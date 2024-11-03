const Book = require('../models/Book');

const addBook = async (req, res) => {
    const { title, author, genre, condition, availability, location } = req.body;
    const book = new Book({ 
        title, 
        author, 
        genre, 
        condition, 
        availability, 
        location,
        userId: req.user._id // Use req.user from the auth middleware
    });

    try {
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error adding book' });
    }
};

const getBooks = async (req, res) => {
  try {
    const currentUserId = req.user._id;
      const books = await Book.find({ userId: req.user._id }); // Fetch books for the authenticated user
      res.status(200).json({books, currentUserId});
  } catch (error) {
      res.status(500).json({ message: 'Error fetching books' });
  }
};
