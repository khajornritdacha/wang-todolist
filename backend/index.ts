import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import AuthRoutes from './src/routes/authRoutes';
import './src/configs/db.config';

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

app.use('/auth', AuthRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at port: ${port}`);
});
