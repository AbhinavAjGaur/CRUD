// import connectDatabase from "../database/db";
import { connectDatabase } from "../database/db";
import { Users } from "../models/user";

export const handler = async (event) => {
  try {
    await connectDatabase();
    const { email } = event.pathParameters;
    const userObj = await Users.findOne({ email });

    if (userObj) {
      console.log(userObj);
      return {
        statusCode: 200,
        body: JSON.stringify(userObj),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "Requested resource is not found in the databse",
        }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
