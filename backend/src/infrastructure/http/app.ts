import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import indexRoutes from './routes/index.routes';
import cookieParser from 'cookie-parser';

export function createApp() {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/health', (req, res) => {
        res.status(200).json({ message: 'OK', timestamp: new Date().toISOString() });
    });

    app.use('/api', indexRoutes);
    app.use(errorHandler);
    
    return app;
}