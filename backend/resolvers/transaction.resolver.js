import Transaction from '../models/transaction.model.js';

const transactionResolver = {
    Query: {
        transactions: async (_, __, context) => {
            try {
                if (!context.getUser()) {
                    throw new Error("User not authenticated");
                }
                const userId = await context.getUser()._id;
                const transactions = await Transaction.find({ userId });
                return transactions;
            } catch (err) {
                console.error(`Error in transactions query: ${err}`);
                throw new Error("Error getting transactions");
            }
        },

        transaction: async (_, { transactionId }, context) => {
            try {
                if (!context.getUser()) {
                    throw new Error("User not authenticated");
                }
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            } catch (err) {
                console.error(`Error in transaction query: ${err}`);
                throw new Error("Error getting transaction");
            }
        },
        
        // TODO: add `categoryStatistics` query
    },
    Mutation: {
        createTransaction: async (_, { input }, context) => {
            try {
                if (!context.getUser()) {
                    throw new Error("User not authenticated");
                }
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id,
                })
                await newTransaction.save();
                return newTransaction;
            } catch (error) {
                console.error(`Error in createTransaction: ${error}`);
                throw new Error("Error creating transaction");
            }
        },

        updateTransaction: async (_, { input }, context) => {
            try {
                if (!context.getUser()) {
                    throw new Error("User not authenticated");
                }
                const updatedTransaction = await Transaction.findByIdAndUpdate(
                    input.transactionId,
                    input,
                    { new: true }
                )
                return updatedTransaction;
            } catch (err) {
                console.error(`Error in updateTransaction: ${err}`);
                throw new Error("Error updating transaction");
            }
        },

        deleteTransaction: async (_, { transactionId }, context) => {
            try {
                if (!context.getUser()) {
                    throw new Error("User not authenticated");
                }
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;
            } catch (err) {
                console.error(`Error in deleteTransaction: ${err}`);
                throw new Error("Error deleting transaction");
            }
        }
    }
}

export default transactionResolver;