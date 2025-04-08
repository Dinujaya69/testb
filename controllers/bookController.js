import Book from "../models/Book";

//create new book
export const createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

