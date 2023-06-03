import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import './src/configs/db.config';
import './src/models/Task';
import './src/models/User';
import authRoutes from './src/routes/authRoutes';
import taskRoutes from './src/routes/taskRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Cors
const corsOptions = {
    origin: ['http://localhost:5000'],
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
