import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { MESSAGE_TYPES_ENUM } from "../constants/message.constant.js";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import User from "../models/user.js";

export const MessageController = {
    create: async (req, res) => {
        try {
            const {senderId = '', conversationId = '', content = '', type = 0} = req.body;
            // ktra sender hop le
            if(!mongoose.isValidObjectId(senderId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid sender id"
                })
            }

            //ktra user ton tai
            const user = await User.findById(new ObjectId(senderId))
            if(!user) {
                return res.status(400).json({
                    success: false,
                    message: " user not exits"
                })
            }

            // ktra conversation
            if (!mongoose.isValidObjectId(conversationId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid conversation"
                })
                
            }
            
            //conversation ton tai
            const conversation = await Conversation.findById(new ObjectId(conversationId))
            if(!conversation) {
                return res.status(400).json({
                    success: false,
                    message: "conversation not exits"
                })
            }

            // content
            if (typeof content !== 'string' || content == "") {
                return res.status(400).json({
                    success: false,
                    message: "invalid content"
                })
            }
            //type
            if (!MESSAGE_TYPES_ENUM.includes(type)) {
                return res.status(400).json({
                    success: false,
                    message: "invalid type"
                })
            }

            const newMessage = await new Message({
                user: new ObjectId(senderId),
                conversation: new ObjectId(conversationId),
                content,
                type
            }).save();

            return res.status(201).json({
                success: true,
                message: "Create successfully",
                data: newMessage
            })



        } catch (error) {
            console.error(error)
            return res.status(500).json({
                success: false,
                message: "Error when create new message"
            })
        }
    }
}