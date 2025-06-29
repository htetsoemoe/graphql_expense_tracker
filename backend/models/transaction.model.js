import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        paymentType: {
            type: String,
            enum: ["cash", "card"],
            required: true,
        },
        category: {
            type: String,
            enum: ["saving", "expense", "investment"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            default: "unknown",
        },
        date: {
            type: Date,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Transaction = mongoose.model("transactions", transactionSchema)
export default Transaction