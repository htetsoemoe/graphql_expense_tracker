import { transactions } from '../dummyData/data.js';

const transactionResolver = {
    Query: {
        transactions: () => {
            return transactions;
        },
        transaction: (_, { id }) => {
            return transactions.find(transaction => transaction._id === id);
        }
    },
    Mutation: {}
}

export default transactionResolver;