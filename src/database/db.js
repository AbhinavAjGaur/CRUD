import { connect } from "mongoose";

let conn = null;

export const connectDatabase = async () => {
  try {
    if (conn == null) {
      console.log(process.env.DB);
      console.log("Creating new connection to the database..");
      conn = await connect(process.env.DB, {
        serverSelectionTimeoutMS: 5000,
      });
      return conn;
    }

    console.log("Connection already established, reusing the connection");
  } catch (error) {
    console.log(error);
  }
};
