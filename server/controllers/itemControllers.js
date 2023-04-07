const User = require("../models/user");
const Item =require("../models/item");

const start = async(req,res) => {


    try{
        const userId = req.user.userId;
        const user = await User.findById(userId);
        //user modification code
        await user.save();
        return res.status(200).json({user});
    }catch(e){
        return res.status(400).send({ msg: "Server Error" });
    }
}

const submit = async(req,res) => {
    try{
        const userId = req.user.userId;
        const user = await User.findById(userId);

        //user code
        return res.status(200).json({user});
    }catch(e){
        return res.status(400).send({ msg: "Server Error" });
    }
}

module.exports = {start, submit};