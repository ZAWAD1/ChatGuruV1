import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        //sender object
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        //recivier object
        reciverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // Text messages object
        text: {
            type: String,
            trim: true,
            maxlength: 2000,
        },
        //Image messages object
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;