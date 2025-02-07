import mongoose  from "mongoose";

type ConnectionObject={
    isConnected?:number
}

const connection:ConnectionObject={}

async function dbConnect():Promise<void> {

    if(connection.isConnected){
        console.log("Already connected to database")
        return
    }
    try {
        const db =await mongoose.connect(process.env.MONGOODB_URL || 'mongodb://127.0.0.1:27017/nextproject1' ,{})
        connection.isConnected=db.connections[0].readyState
        console.log("DB Connected Successfully")

    } catch (error) {
        console.log("Database connection failed ",error)
        process.exit(1)
    }
}
export default dbConnect;

// import mongoose from "mongoose";

// type ConnectionObject = {
//   isConnected?: number;
// };

// const connection: ConnectionObject = {};

// async function dbConnect(): Promise<void> {
//   if (connection.isConnected) {
//     console.log("✅ Already connected to database");
//     return;
//   }

//   try {
//     const MONGODB_URI = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/nextConnect";

//     const db = await mongoose.connect(MONGODB_URI, {
//       dbName: "nextConnect", // Ensure database name is explicitly mentioned
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     });

//     connection.isConnected = db.connections[0].readyState;
//     console.log("✅ DB Connected Successfully");

//   } catch (error) {
//     console.error("❌ Database connection failed: ", error);
//     process.exit(1);
//   }
// }

// export default dbConnect;
