import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addEmployee,getEmployees,getEmployee, updateEmployee, fetchEmployeesByDepId } from '../controllers/employeeController.js'
import upload from '../public/uploads.js'


const router = express.Router()

router.get('/' , authMiddleware, getEmployees ) 
router.post('/add' , authMiddleware, upload.single('image'), addEmployee ) 
router.get('/:id' , authMiddleware, getEmployee ) 
router.put('/:id' , authMiddleware, updateEmployee ) 
router.get('/department/:id' , authMiddleware, fetchEmployeesByDepId ) 





export default router; 