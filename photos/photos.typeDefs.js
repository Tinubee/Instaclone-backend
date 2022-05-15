import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: Int!
    user: User
    file: String!
    caption: String
    hashtags: [Hashtag]
    createAt: String!
    updateAt: String!
    likes: Int!
    isMine: Boolean!
    commentNumber: Int!
    comments: [Comment]
    isLiked: Boolean!
  }

  type Hashtag {
    id: Int!
    hashtags: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createAt: String!
    updateAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    createAt: String!
    updateAt: String!
  }
`;
