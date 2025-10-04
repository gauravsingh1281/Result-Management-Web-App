import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connectedDb = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb connected at ${connectedDb.connection.host}`);
    } catch (error) {
        console.log(`Mongodb failed to connect due to ${error}`);
        process.exit(1);
    };
};

export default connectDb;