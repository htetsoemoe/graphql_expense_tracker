import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport"

export const configurePassword = async () => {
    // Registers a function used to serialize user objects into the session.
    passport.serializeUser((user, done) => {
        console.log(`Serialize user: ${user.id}`);
        done(null, user.id);
    });

    // Registers a function used to deserialize user objects out of the session
    passport.deserializeUser(async (id, done) => {
        console.log(`Deserialize user: ${id}`);
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

    // Registers a function used to authenticate a user using the provided credentials.
    passport.use(
        new GraphQLLocalStrategy(
            async (username, password, done) => {
                try {
                    const user = await User.findOne({ username });
                    if (!user) {
                        throw new Error("Invalid or wrong username");
                    }
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) {
                        throw new Error("Invalid password");
                    }
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    )
}