import client from "../../client";
import { protextedResolvers } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protextedResolvers((_, { offset }, { loggedInUser }) =>
      client.photo.findMany({
        take: 2,
        skip: offset,
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
