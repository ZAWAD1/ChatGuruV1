import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.js";
import User from "../models/User.js";


// Contacts retrival
export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getting all contacts", error);
        res.status(500).json({ message: "Server error" });
    }
}

//User based message retrival
export const getMessageByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const message = await Message.find({
            $or: [
                { senderId: myId, reciverId: userToChatId },
                { senderId: userToChatId, reciverId: myId }
            ]
        })

        res.status(200).json(message);
        
    } catch (error) {
        console.log("Error in getting messages: ", error.message);
        res.status(500).json({ message: "Server error" });
    }
}

// Sending messages
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: reciverId } = req.params;
        const senderId = req.user._id;

        let imageURL;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }

        //New message
        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: imageURL,
        });

        await newMessage.save();

        //todo: send message in real time if user is online. ( socket.io is will be used )

        res.status(200).json({ message: "Message sent successfully" });

    } catch (error) {
        console.log("Error in sending message: ", error.message);
        res.status(500).json({ message: "Server error" });
    }
}

// Get all chat partners
export const getAllPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { reciverId: loggedInUserId }
            ]
        })

        const chatPartnersIds = [
            ...new Set(messages.map(msg =>
                msg.senderId.toString() === loggedInUserId.toString()
                    ? msg.reciverId.toString()
                    : msg.senderId.toString()
            )
            ),
        ]


        const chatPartners = await User.find({ _id: { $in: chatPartnersIds } }).select("-password")

        res.status(200).json(chatPartners)
    } catch (error) {
        console.log("Error in getChatPartners ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}