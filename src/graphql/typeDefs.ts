const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Movie {
    _id:ID
    country: String
    director: String
    duration: Int
    year: String
    description: String
    image: String
    trailerLink: String
    thumbnail: String
    owner: User
    movieId: Int
    nameRU: String
    nameEN: String
  }

  type SessionInfo {
    token: String!
  }

  input RegisterInput {
    email: String!
    name: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    login(data: LoginInput): SessionInfo!
    register(data: RegisterInput): User!
  }
`;

export default typeDefs;