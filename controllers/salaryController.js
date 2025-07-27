import Salary from '../models/Salary.js'
import Employee from '../models/Employee.js'
import mongoose from 'mongoose'; 


const addSalary = async (req,res) => {
    try{
        const {employeeId, basicSalary, allowances, deductions , payDate} = req.body

        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions)

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary : totalSalary,
            payDate
        })

        await newSalary.save()

        return res.status(200).json({
            success: true,
            message: "Salary Added Successfully"
        })
    } catch{
        return res.status(500).json({
            success: false,
            error: 'Salary Updation Server Error'
        })
    }
    
}

const getSalary = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findOne({ userId: id });

    let employeeIdToSearch;

    if (employee) {
      employeeIdToSearch = employee._id;
    } else {
      employeeIdToSearch = id;
    }

    const salary = await Salary.find({ employeeId: employeeIdToSearch })
      .populate("employeeId", "employeeId");

    if (!salary || salary.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No salary records found",
        salary: [],
      });
    }

    res.status(200).json({ success: true, salary });
  } catch (error) {
    console.error("Error fetching salary:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};






export {addSalary , getSalary}