import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    // _id = u1 _id + u2 _id  (u1 < u2 - compare both and arrange in order)
    _id: {
        type: String,
        require: true
    },
    messages: {
        type: Array
    }
});

const Chat = mongoose.model("chat", chatSchema);
export default Chat;