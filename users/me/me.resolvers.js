import client from "../../client";
import { protextedResolvers } from "../users.utils";

export default {
  Query: {
    me: protextedResolvers((_, __, { loggedInUser }) =>
      client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
      })
    ),
  },
};
