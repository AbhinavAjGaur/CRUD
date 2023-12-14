// import connectDatabase from "../database/db";
import { connectDatabase } from "../database/db";
import { Users } from "../models/user";

export const handler = async (event) => {
  try {
    console.log(event);
    await connectDatabase();

    const userObj = await Users.find();
    return {
      statusCode: 200,
      body: JSON.stringify(userObj),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
