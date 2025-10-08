import 'dotenv/config';
import mongoose from 'mongoose';
import Book from './models/book.mjs';

async function cleanupDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const result = await Book.deleteMany({});
    console.log(`🧹 Deleted ${result.deletedCount} books`);

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Cleanup error:", err);
  }
}

cleanupDatabase();
