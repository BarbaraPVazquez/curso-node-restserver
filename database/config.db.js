import mongoose from 'mongoose';

const client = process.env.MONGODB_URI

export async function connectToMongoDB() {
  try {
    await mongoose.connect(client)
    console.log("You successfully connected to MongoDB!");
  } catch (err) {
    console.dir(err);
  }
}

