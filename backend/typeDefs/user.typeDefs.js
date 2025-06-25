// Whenever you update your typeDefs, you must restart your GraphQL server (especially if you're not using hot-reload).
const userTypeDefs = `#graphql
    type User {
        _id: ID!,
        username: String!,
        name: String!,
        password: String!,
        profilePicture: String,
        gender: String!,
        transactions: [Transaction!]
    }

    type Query {
        authUser: User,
        user(userId: ID!): User,
    }

    type Mutation {
        signUp(input: SignUpInput!): User,
        signIn(input: SignInInput!): User,
        logout: LogoutResponse,
    }

    input SignUpInput {
        username: String!,
        name: String!,
        password: String!,
        gender: String!,
    }

    input SignInInput {
        username: String!,
        password: String!,
    }

    type LogoutResponse {
        message: String!
    }
`;

export default userTypeDefs;