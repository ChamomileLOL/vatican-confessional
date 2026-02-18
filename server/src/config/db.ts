// server/src/config/db.ts
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`[VATICAN] Connected to The Archive: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[HERESY] Connection Failed: ${(error as Error).message}`);
    // "Excommunication" of the process
    process.exit(1);
  }
};

export default connectDB;