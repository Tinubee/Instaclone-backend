import client from "../../client";
import { protextedResolvers } from "../../users/users.utils";

export default {
  Query: {
    seeRoom: protextedResolvers((_, { id }, { loggedInUser }) =>
      client.room.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      })
    ),
  },
};
