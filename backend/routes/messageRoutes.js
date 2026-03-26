const express=require("express");
const {sendmessage,getmessage} = require("../controllers/messageContoller.js");
const isAuth = require("../middleware/isAuth.js");
const router=express.Router();

router.route("/send/:id").post(isAuth,sendmessage);
router.route("/get/:id").post(isAuth,getmessage);

module.exports=router;