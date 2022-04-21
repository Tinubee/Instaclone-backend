import client from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // check if username or email already exists on DB
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("Username or email already exists");
        }
        // hash password
        const hashPassword = await bcrypt.hash(password, 10);
        // save and return the user
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: hashPassword,
          },
        });
      } catch (error) {
        return error;
      }
    },
  },
};
