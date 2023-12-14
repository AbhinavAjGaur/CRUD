// import connectDatabase from "../database/db";
import { connectDatabase } from "../database/db";
import { Users } from "../models/user";

export const handler = async (event) => {
  try {
    console.log(event);
    await connectDatabase();
    const { name, email, password } = JSON.parse(event.body);
    let userObj = {
      name,
      email,
      password,
    };
    userObj = await Users.create(userObj);
    return {
      statusCode: 201,
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
