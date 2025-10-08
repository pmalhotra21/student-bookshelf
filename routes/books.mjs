import express from 'express';
import Book from '../models/book.mjs';

const router = express.Router();

// GET all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// GET one book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Not found' });
    res.json(book);
  } catch {
    res.status(500).json({ error: 'Invalid ID' });
  }
});

// POST (create)


router.post('/', async (req, res) => {
  console.log('📥 Received POST /api/books, body =', req.body);  // << log
  try {
    const book = await Book.create(req.body);
    console.log('✅ Created book:', book);  // << log
    res.status(201).json(book);
  } catch (err) {
    console.error('❌ POST /api/books error:', err);  // << log
    res.status(400).json({ error: err.message });
  }
});


// PUT (update)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
