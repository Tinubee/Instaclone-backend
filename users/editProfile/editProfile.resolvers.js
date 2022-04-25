import fs from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protextedResolvers } from "../users.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = fs.createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }

  let _hashPassword = null;
  if (newPassword) {
    _hashPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(_hashPassword && { password: _hashPassword }),
      ...(avatarUrl && { avatar: avatarUrl }),
      // password: newPassword ? _hashPassword : password,
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return { ok: false, error: "Can't update profile" };
  }
};

export default {
  Mutation: {
    editProfile: protextedResolvers(resolverFn),
  },
};
