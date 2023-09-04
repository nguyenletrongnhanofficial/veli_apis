import mongoose from "mongoose";

const conversation = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },

    participants: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]
});
const Conversation = mongoose.model("conversation", conversation, "conversation");
export default Conversation;