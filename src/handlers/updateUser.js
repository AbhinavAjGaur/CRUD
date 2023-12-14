import { connectDatabase } from "../database/db";
import { Users } from "../models/user";

export const handler = async (event) => {
  try {
    await connectDatabase();

    const { email } = event.pathParameters;
    const updateData = JSON.parse(event.body);

    const updatedUser = await Users.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );

    if (updatedUser) {
      return {
        statusCode: 200,
        body: JSON.stringify(updatedUser),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "User not found in the database",
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
