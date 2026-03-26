const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getToken = require("../utils/token.js");


const Registers = async (req, res) => {
    try {
        console.log("Enter in register");

        const { fullname, username, password, gender, confpassword } = req.body;
        if (!fullname || !username || !gender || !password || !confpassword) {
            return res.status(400).json({ message: "All entry should be filled" });
        }

        if (password !== confpassword) {
            return res.status(400).json({ message: "Password should be same" });
        }

        let u = await userModel.findOne({ username });
        if (u) {
            return res.status(400).json({ message: "UserName already exist" });
        }

        const hashfunction = await bcrypt.hash(password, 10);

        const maleprofilephoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleprofilephoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        u = await userModel.create({
            fullname,
            username,
            password: hashfunction,
            gender,
            profilePhoto: gender === "male" ? maleprofilephoto : femaleprofilephoto
        });

        const token = getToken(u._id);

        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.status(200).json({ message: "Registered successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error occurred" });
    }
};
const Login = async (req, res) => {
    try {
        console.log("Enter in login");

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Enter username and password both" });
        }

        const u = await userModel.findOne({ username });
        if (!u) {
            return res.status(400).json({ message: "UserName not exist" });
        }

        const isMatch = await bcrypt.compare(password, u.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Username or Password" });
        }

        const token = getToken(u._id);

        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.status(200).json({
            message: "Login successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error occurred" });
    }
};

const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "User LogOut sucessfully" });
    }
    catch (error) {
        return res.status(500).json({ message: `LogOut error ${error.message}` });
    }
};

const GetOtherUser = async (req, res) => {
    try {
        const LoginUserId = req.userId;
        const otherUserId = await userModel.find({ _id: { $ne: LoginUserId } }).select("-password");
        return res.status(200).json({ otherUserId });
    } catch (error) {
        console.log("error in getOtherUser");
        return res.status(500).json({ message: `getOtherUser error ${error.message}` });
    }
}

module.exports = { Registers, Login, Logout, GetOtherUser };