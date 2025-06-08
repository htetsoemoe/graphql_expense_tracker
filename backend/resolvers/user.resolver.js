import { users } from '../dummyData/data.js';

const userResolver = {
    Query: {
        users: () => { // (parent, args, context, info) => { ... }
            return users;
        },
        user: (_, { id }) => {
            return users.find(user => user._id === id);
        }
    },
    Mutation: {}
}

export default userResolver;