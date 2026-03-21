import mongoose from 'mongoose'

const dbConnect = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MongoDB URL is missing in environment variables");
        }

        const conn = await mongoose.connect(
            `${process.env.MONGODB_URL}/notes-app`
        );

        console.log(`Mongodb Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("DB connection error", error.message);

        process.exit(1)
    }
}

export default dbConnect;