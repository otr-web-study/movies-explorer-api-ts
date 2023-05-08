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

  type InfoMessage {
    message: String
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

  input UpdateUserInput {
    name: String
    email: String
  }

  input CreateMovieInput {
    country: String!
    director: String!
    duration: Int!
    year: String!
    description: String!
    image: String!
    trailerLink: String!
    thumbnail: String!
    movieId: Int!
    nameRU: String!
    nameEN: String!
  }

  type Query {
    currentUser: User
    movies: [Movie]
  }

  type Mutation {
    login(data: LoginInput): SessionInfo!
    register(data: RegisterInput): User!
    updateUser(data: UpdateUserInput): User!
    createMovie(data: CreateMovieInput): Movie!
    deleteMovie(_id: ID!): InfoMessage!
  }
`;

export default typeDefs;