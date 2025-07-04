import mongoose from 'mongoose';
import dotenv from 'dontenv';

dotenv.config();
const uri = process.env.MONGO_URI;

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error: ', err));

export default mongoose;