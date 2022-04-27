import client from "../../client";
import { protextedResolvers } from "../../users/users.utils";
import { processHashtags } from "../photos.utills";

export default {
  Mutation: {
    uploadPhoto: protextedResolvers(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObjs = [];
        if (caption) {
          // parse caption
          hashtagObjs = processHashtags(caption);
        }
        // get or create Hashtags
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObjs.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObjs,
              },
            }),
          },
        });

        //save the photo with the parsed hastags
        //add the photo to the hastags
      }
    ),
  },
};
