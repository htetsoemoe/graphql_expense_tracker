import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: "default.jpg",
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            default: "other",
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("users", userSchema)
export default User