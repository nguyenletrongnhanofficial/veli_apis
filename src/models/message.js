import mongoose from "mongoose";
import { MESSAGE_TYPES_ENUM } from "../constants/message.constant.js";

const message = new mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    conversation: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'conversation'
    },

    content: {
        type: String
    },

    type: {
        type: Number,
        default: 0, // 0 - text, 1 - img, 2 - icon, 3 - file, 4 - url, 5 - video, 6 - audio
        enum: MESSAGE_TYPES_ENUM
    }
},{
    timestamps: true
})
const Message = mongoose.model("message", message, "message");
export default Message;