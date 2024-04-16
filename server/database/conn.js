import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            dbName: "mern-email-reset",
            maxPoolSize: 50
        })
    } catch (error) {
        console.log(error)
    }
}

export default connect