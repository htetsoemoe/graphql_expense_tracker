import User from '../models/user.model.js';
import Transaction from '../models/transaction.model.js';
import bcrypt from 'bcryptjs';

const userResolver = {
    Mutation: {
        signUp: async (_, { input }, context) => { // (parent,  args, context, info)
            try {
                const { username, name, password, gender } = input;

                if (!username || !name || !password || !gender) {
                    throw new Error("Missing required fields");
                }

                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error("Username already exists");
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
                });
                await newUser.save();
                await context.login(newUser); // adds user to session
                return newUser;
            } catch (error) {
                console.error(`Error in signUp: ${error}`);
                throw new Error(error.message || `Internal server error`);
            }
        },
        signIn: async (_, { input }, context) => {
            try {
                const { username, password } = input;
                if (!username || !password) {
                    throw new Error("Missing required fields");
                }

                const { user } = await context.authenticate('graphql-local', {
                    username,
                    password,
                });

                await context.login(user); // adds user to session
                return user;
            } catch (error) {
                console.error(`Error in signIn: ${error}`);
                throw new Error(error.message || `Internal server error`);
            }
        },
        logout: async (_, __, context) => {
            try {
                await context.logout();
                context.req.session.destroy((err) => {
                    if (err) throw err;
                });
                context.res.clearCookie('connect.sid');
                return { message: "Logout successful" };
            } catch (error) {
                console.error(`Error in logout: ${error}`);
                throw new Error(error.message || `Internal server error`);
            }
        },
    },
    Query: {
        authUser: async (_, __, context) => { // (parent, args, context, info) => { ... }
            try {
                const user = await context.getUser();
                return user;
            } catch (error) {
                console.error(`Error in authUser: ${error}`);
                throw new Error(error.message || `Internal server error`);
            }
        },
        user: async (_, { userId }) => {
            try {
                const user = await User.findById(userId);
                return user;
            } catch (error) {
                console.error(`Error in user query: ${error}`);
                throw new Error(error.message || `Internal server error`);
            }
        }
    },
    User: {
        transactions: async (parent) => {
            try {
                const transactions = await Transaction.find({ userId: parent._id })
                return transactions;
            } catch (error) {
                console.error(`Error in User resolver: ${error}`);
                throw new Error(error.message || `Internal server error`);
            }
        }
    }
}

export default userResolver;