const mongoose = require("mongoose");

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongo DB Connected");
        
    } catch (error) {
        console.log(error);
    }
}
