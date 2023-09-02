import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

export const ConversationController = {
    create: async (req, res) => {
        try {
            const { participants = [], name = '' } = req.body;
            //ktra nguoi tham gia hop le
            if (!Array.isArray(participants) || participants.length < 2) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid participants"
                })
            }

            if (!participants.every(id => mongoose.isValidObjectId(id))) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid userId"
                })
            }

            if (typeof name !== 'string' || name == "") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid participant's name"
                })
            }

            const parseToObjectId = participants.map(id => new ObjectId(id));

            const conversation = await Conversation.findOne({
                participants: { $all: parseToObjectId }
            })

            if (conversation) {
                return res.status(200).json({
                    success: true,
                    data: conversation
                })
            }

            const newConversation = await new Conversation({
                name,
                participants: parseToObjectId,
            }).save();

            return res.status(201).json({
                success: true,
                message: "Create successfully",
                data: newConversation
            })

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                success: false,
                message: "Error when create new Conversation"
            })
        }

    },

    getUserConversation: async (req, res) => {
        try {
            const {userId} = req.params;
            if(!userId) {
                return res.status(400).json({
                    success: false,
                    message: "user not exits"
                })
            }
            const conversationList = await Conversation.find({participants: new ObjectId(userId),})
            return res.status(200).json({
                success: true,
                message: "OK",
                data: conversationList
            })
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                success: false,
                message: " Error when get user conversation"
            })
        }
    },

    getConversationMessage: async(req, res) => {
        try {
            const{conversationId} = req.params
            if (!conversationId) {
                return res.status(400).json({
                    success: false,
                    message: "conversation not exits"
                })
            }
            const messageList = await Message.find({conversation: new ObjectId(conversationId)})
            return res.status(200).json({
                success: true,
                message: "OK", 
                data: messageList
            })
        } catch (error) {
            console.error(error)
            return res. status(500).json({
                success: false,
                mesage: "Error when get message"
            })
        }
    }


}