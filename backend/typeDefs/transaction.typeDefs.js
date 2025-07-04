// Whenever you update your typeDefs, you must restart your GraphQL server (especially if you're not using hot-reload).

const transactionTypeDefs = `#graphql
    type Transaction {
        _id: ID!,
        userId: ID!,
        description: String!,
        paymentType: String!,
        category: String!,
        amount: Float!,
        location: String,
        date: String!,
        user: User!
    }

    type Query {
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction
        categoryStatistics: [CategoryStatistics!]
    }

    type Mutation {
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }

    type CategoryStatistics {
        category: String!
        totalAmount: Float!
    }

    input CreateTransactionInput {
        description: String!,
        paymentType: String!,
        category: String!,
        amount: Float!,
        date: String!,
        location: String,
    }

    input UpdateTransactionInput {
        transactionId: ID!,
        description: String,
        paymentType: String,
        category: String,
        amount: Float,
        date: String,
        location: String,
    }
`

export default transactionTypeDefs;