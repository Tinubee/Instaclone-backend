import client from "../../client";
import { protextedResolvers } from "../../users/users.utils";

export default {
  Query: {
    seeRooms: protextedResolvers(async (_, __, { loggedInUser }) =>
      client.room.findMany({
        where: {
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
