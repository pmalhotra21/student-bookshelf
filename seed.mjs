import 'dotenv/config';
import mongoose from 'mongoose';
import Book from './models/book.mjs';

const sampleBooks = [
  { title: "Digital Fortress", author: "Dan Brown", year: 1998, summary: "A techno-thriller." },
  { title: "Atomic Habits", author: "James Clear", year: 2018, summary: "Change your habits, change your life." },
  { title: "The Alchemist", author: "Paulo Coelho", year: 1988, summary: "Spiritual journey of a boy." }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");

    await Book.deleteMany({});
    console.log("🗑️ Existing books deleted");

    const result = await Book.insertMany(sampleBooks);
    console.log(`✅ Seeded ${result.length} books to DB`);

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Seed error:", err);
  }
}

seedDatabase();
