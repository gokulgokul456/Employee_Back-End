import Employee from "../models/Employee.js"
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path';
import Department from '../models/Department.js'




const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/uploads")
    },
    filename :  (req, file, cb)=>{
        cb(null, Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role
        } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                error: "User Already Registered",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        });

        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });

        await newEmployee.save();

        return res.status(200).json({
            success: true,
            message: "Employee created"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: "Server error in employee creation"
        });
    }
}

const getEmployees = async function (req,res) {
     try {
        const employees = await Employee.find().populate('userId', {password : 0}).populate('department')
        return res.status(200).json({
            success: true,
            employees : employees
        })
    } catch (error) {
        return res.status(500).json({
            success:false, 
            error:"get Employee Server Error"
        })
    }
}

const getEmployee = async function (req, res) {
  const { id } = req.params;

  try {
    let employee;
     employee = await Employee.findById({_id:id})
      .populate('userId', { password: 0 })
      .populate('department');
      if (!employee) {
        employee = await Employee.findOne({userId : id})
      .populate('userId', { password: 0 })
      .populate('department');
      }

    return res.status(200).json({
      success: true,
      employee: employee
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "View Employee Server Error"
    });
  }
};

const updateEmployee = async (req,res) => {
    try {
        const {id} = req.params;

        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;

        const employee = await Employee.findById({_id: id})

         if (!employee) {
            return res.status(200).json({
            success: false,
            message: "Employee Not Found"
        });
         }

         const user = await User.findById({_id: employee.userId})
          if (!user) {
            return res.status(200).json({
            success: false,
            message: "user Not Found"
        });
         }

         const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})
         const updateEmployee = await Employee.findByIdAndUpdate({_id:id},{
            maritalStatus,
            designation,
            salary,
            department
    })
    
    if (!updateEmployee|| !updateUser) {
        return res.status(200).json({
            success: false,
            message: "Document Not Found"
        });
    }

    return res.status(200).json({
        success:true,
        message:"Employee Update"
    })

    } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Update Employee Server Error"
    });
    }

    
}

const fetchEmployeesByDepId = async (req,res) => {
    const { id } = req.params;

  try {
    const employees = await Employee.find({ department:id})

    return res.status(200).json({
      success: true,
      employees: employees
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get EmployeesByDepId Server Error"
    });
  }
}


export {addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId}