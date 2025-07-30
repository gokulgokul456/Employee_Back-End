import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import serverless from 'serverless-http';

import connectDb from '../connection/connection.js';
import authRouter from '../routes/auth.js';
import departmentRouter from '../routes/department.js';
import employeeRouter from '../routes/employee.js';
import salaryRouter from '../routes/salary.js';
import leaveRouter from '../routes/leave.js';
import settingsRouter from '../routes/settings.js';
import dashboardRouter from '../routes/dashborad.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDb()
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leaves', leaveRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/dashboard', dashboardRouter);

export const handler = serverless(app);
