import User from "../models/User.js"
import bcrypt from 'bcrypt';

const changePassword = async (req,res) => {
    try {
        const {
            userId,
            oldPassword,
            newPassword,
            confirmPassword
        } = req.body;

        const user = await User.findById({_id: userId})

        if (!user) {
            return res.status(404).json({
                success: false,
                error:"user not found error"
            })  
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password) 
        if (!isMatch) {
            return res.status(404).json({
                success: false,
                error: "Wrong Old Password"
            }) 
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)

        const newUser = await User.findByIdAndUpdate({_id: userId}, {password: hashPassword})

        return res.status(200).json({
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            success: false, 
            error: "settings error",
        })
    }
    
}

export {changePassword}