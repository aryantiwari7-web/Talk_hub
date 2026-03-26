const ConversationModel = require("../models/conversation.js");
const messageModel = require("../models/messagemodel.js");

const sendmessage=async (req,res)=>{
    try {
        const senderId=req.userId;
        const receiverId=req.params.id;
        const {message}=req.body;

        let getConversation=await ConversationModel.findOne({
            participants:{$all:[senderId , receiverId]}
        });

        console.log(message);

        if(!getConversation){
            getConversation=await ConversationModel.create({
                participants:[senderId , receiverId]
            })
        };

        const newMessage = await messageModel.create({
            senderID:senderId,
            receiverID:receiverId,
            message
        });

        console.log(newMessage);

        if(newMessage){
            getConversation.messages.push(newMessage._id);
        }

        await getConversation.save();

        //SOCKET IO

        return res.status(200).json({message:"message send sucessfully"});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"message not send"});
    }
}

const getmessage=async (req,res)=>{
    try {
        const senderId=req.userId;
        const receiverId=req.params.id;
    
        const conversation=await ConversationModel.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("messages");
    
        console.log(conversation);
    
        return res.status(200).json({conversation});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"message not get"});
    }
}

module.exports={ sendmessage , getmessage };