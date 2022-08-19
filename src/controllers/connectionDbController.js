import mongoose from "mongoose"; // cant use named import here ?

// db connection
let db;

export const connectDatabase = async () =>
  new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.MONGO_DB_HOST,
      {
        user: process.env.MONGO_USERNAME,
        pass: process.env.MONGO_ROOTPASSWORD,
        dbName: process.env.MONGO_DB_DATABASE,
        // authSource: process.env.MONGO_DB_AUTH_SOURCE,
        // authMechanism: process.env.MONGO_DB_AUTH_MECHANISM,
        maxPoolSize: 10, // Maintain up to 10 socket connections
        // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      },
      (err) => {
        if (err) {
          reject(err);
        }
        console.log("########################### Connected to database ###########################");
        resolve();
      }
    );
  });

 
      
 // await connect('mongodb://root:root@localhost:27017/voyage?authSource=admin&authMechanism=DEFAULT');// je sais foutre pas pourquoi ni comment le authSource fonctionne 






