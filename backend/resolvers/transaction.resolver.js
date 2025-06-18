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
        categoryStatistics: async (_, __, context) => {
            if (!context.getUser()) {
                throw new Error("User not authenticated");
            }

            const userId = await context.getUser()._id;
            const transactions = await Transaction.find({ userId });
            const categoryMap = {};

            transactions.forEach((transaction) => {
                if (!categoryMap[transaction.category]) {
                    categoryMap[transaction.category] = 0;
                }
                categoryMap[transaction.category] += transaction.amount;
            })

            // Returns type CategoryStatistics { category: string, totalAmount: number }
            return Object.entries(categoryMap).map(([category, totalAmount]) => ({
                category,
                totalAmount
            }));

            /**
             const transactions = [
                { category: "expense", amount: 50 },
                { category: "expense", amount: 75 },
                { category: "investment", amount: 100 },
                { category: "saving", amount: 30 },
                { category: "saving", amount: 20 }
            ];

            const categoryMap = {};
            transactions.forEach((transaction) => {
                if (!categoryMap[transaction.category]) {
                    categoryMap[transaction.category] = 0;
                }
                categoryMap[transaction.category] += transaction.amount;
            })
            const categoryMap = { expense: 125, investment: 100, saving: 50 }

            Object.entries(categoryMap)
            (3) [Array(2), Array(2), Array(2)]
            0
            : 
            (2) ['expense', 125]
            1
            : 
            (2) ['investment', 100]
            2
            : 
            (2) ['saving', 50]
            length
            : 
            3
            [[Prototype]]
            : 
            Array(0)


            Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }))
            (3) [{…}, {…}, {…}]
            0
            : 
            {category: 'expense', totalAmount: 125}
            1
            : 
            {category: 'investment', totalAmount: 100}
            2
            : 
            {category: 'saving', totalAmount: 50}
            length
            : 
            3
            [[Prototype]]
            : 
            Array(0)

             */
        }
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