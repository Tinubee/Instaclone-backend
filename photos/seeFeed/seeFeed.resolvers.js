import client from "../../client";
import { protextedResolvers } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protextedResolvers((_, __, { loggedInUser }) =>
      client.photo.findMany({
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createAt: "desc",
        },
      })
    ),
  },
};
