import { connectDatabase } from "../database/db";
import { Users } from "../models/user";

export const handler = async (event) => {
  try {
    await connectDatabase();

    const { email } = event.pathParameters;

    const deletedUser = await Users.findOneAndDelete({ email });

    if (deletedUser) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "User deleted successfully" }),
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
