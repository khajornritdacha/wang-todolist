import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import './src/configs/db.config';
import './src/models/Task';
import './src/models/User';
import authRoutes from './src/routes/authRoutes';
import taskRoutes from './src/routes/taskRoutes';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

const app: Express = express();
const port = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
console.log('FRONTEND_URL: ' + FRONTEND_URL);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);

// Cors
const corsOptions = {
    origin: [FRONTEND_URL],
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/auth', authRoutes);
app.use('/api', taskRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at port: ${port}`);
});
