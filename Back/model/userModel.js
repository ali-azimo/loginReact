import mongoose from "mongoose";
const userSchema = new mongoose({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    veritionToken: String,
    veritionTokenExpiresAt: Date,
}, { timestamps: true });


export const User = mongoose.model("User", userSchema)
    //perminte criar automatcamente aexpressao (criado ou ctualizado)