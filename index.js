import express from 'express';
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import connectDb from './connection/connection.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingsRouter from './routes/settings.js'
import dashboardRouter from './routes/dashborad.js'



connectDb()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('public/uploads'));
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leaves', leaveRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/dashboard', dashboardRouter)




app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running on port ${process.env.PORT} `);
})