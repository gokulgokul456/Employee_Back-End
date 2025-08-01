import mongoose, { Schema } from "mongoose";

const leaveSchema = new Schema({
    employeeId : { type : Schema.Types.ObjectId, ref: "Employee", required : true},
    leaveType: {
        type: String, 
        enum : ["Sick Leave", "Casual Leave", "Annual Leave", "Other"],
        required: true, 
    },
    startDate : {type: Date , required : true},
    endDate : {type: Date , required : true},
    Description : {type: String , required : true},
    status : {
        type: String, 
        enum : ["Pending" , "Approved", "Rejected"],
        default : "Pending",
    },
    appliedAt : {type : Date, default : Date.now},
    updatedAt : {type : Date, default : Date.now},
});

const Leave =  mongoose.model("Leave", leaveSchema)
export default Leave;