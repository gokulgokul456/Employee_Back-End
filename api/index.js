import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http'; 
import authRouter from '../routes/auth.js';
import departmentRouter from '../routes/department.js';
import employeeRouter from '../routes/employee.js';
import connectDb from '../connection/connection.js';
import salaryRouter from '../routes/salary.js';
import leaveRouter from '../routes/leave.js';
import settingsRouter from '../routes/settings.js';
import dashboardRouter from '../routes/dashborad.js';

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

app.use('/auth', authRouter);
app.use('/department', departmentRouter);
app.use('/employee', employeeRouter);
app.use('/salary', salaryRouter);
app.use('/leaves', leaveRouter);
app.use('/settings', settingsRouter);
app.use('/dashboard', dashboardRouter);

export const handler = serverless(app);
