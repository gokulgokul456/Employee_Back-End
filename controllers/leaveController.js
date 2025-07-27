import Leave from '../models/Leave.js'
import Employee from '../models/Employee.js'

const addLeave = async (req, res) => {
  try {
    const { userId, startDate, endDate, leaveType, Description } = req.body;

    const employee = await Employee.findOne({ userId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found"
      });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      startDate,
      endDate,
      leaveType,
      Description,
    });

    await newLeave.save();

    return res.status(200).json({
      success: true,
      message: "Leave Apply Successfully"
    });
  } catch (error) {
    console.error("Backend Error:", error);
    return res.status(500).json({
      success: false,
      error: 'Leave Apply Server Error'
    });
  }
};

const getLeaves = async (req,res) => {

  try {
    const {id} = req.params;
    
    const employee = await Employee.findOne({userId : id})

    const leaves = await  Leave.find({employeeId : employee._id})

    return res.status(200).json({success : true,leaves})
    
  } catch (error) {

    console.error("Backend Error:", error);

    return res.status(500).json({

      success: false,

      error: 'Get Leave Server Error'

    });

  }
  
}

const getLeave = async (req,res) => {
   try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select : "dep_name"
        },
        {
          path: "userId",
          select: "name"
        }
      ]
    })
    

    return res.status(200).json({success : true, leaves})
    
  } catch (error) {

    console.error("Backend Error:", error);

    return res.status(500).json({

      success: false,

      error: 'Admin Leave Server Error'

    });

  }
  
}

const getLeaveDetail = async (req, res) => {
   try {
    const {id} = req.params;
    const leave = await Leave.findById({_id : id}).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select : "dep_name"
        },
        {
          path: "userId",
          select: "name , profileImage"
        }
      ]
    })
    

    return res.status(200).json({success : true, leave})
    
  } catch (error) {

    console.error("Backend Error:", error);

    return res.status(500).json({

      success: false,

      error: 'Admin View Leave Server Error'

    });

  }
  
}

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status value",
      });
    }

    const leave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true } 
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        error: "Leave Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave status updated",
      leave,
    });
  } catch (error) {
    console.error("Backend Error:", error);

    return res.status(500).json({
      success: false,
      error: "Admin Leave Update Server Error",
    });
  }
};

const viewLeaves = async (req,res) => {

  try {
    const {id} = req.params;

    let leaves = await Leave.find({employeeId : id})

    if (!leaves) {
      const employee = await Employee.findOne({userId : id})

     leaves = await  Leave.find({employeeId : employee._id})

    }
    
   

    return res.status(200).json({success : true,leaves})
    
  } catch (error) {

    console.error("Backend Error:", error);

    return res.status(500).json({

      success: false,

      error: 'Get Leave Server Error'

    });

  }
  
}


export { addLeave , getLeaves , getLeave , getLeaveDetail , updateLeave , viewLeaves};
