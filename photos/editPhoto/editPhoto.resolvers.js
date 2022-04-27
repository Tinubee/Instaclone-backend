import client from "../../client";
import { protextedResolvers } from "../../users/users.utils";
import { processHashtags } from "../photos.utills";

export default {
  Mutation: {
    editPhoto: protextedResolvers(
      async (_, { id, caption }, { loggedInUser }) => {
        const oldPhotos = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });
        if (!oldPhotos) {
          return {
            ok: false,
            error: "Photo not found",
          };
        }
        await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhotos.hashtags,
              connectOrCreate: processHashtags(caption),
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
