import mongoose from "mongoose";
import CustomError from "../utils/custom.error.js";


const connectDb = async (req, res) => {
    const url = process.env.URL;
    try {
        await mongoose.connect(url);
    } catch (error) {
        throw new CustomError(error.message, 500);
    }
}

export default connectDb;