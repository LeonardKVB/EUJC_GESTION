import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { apiResponse } from './utils/apiResponse';

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes API (Phase 1.4)
import routes from './routes/index';
app.use('/api/v1', routes);

// Gestionnaire d'erreurs global (Phase 1.1)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Erreur interne du serveur';
  res.status(status).json(apiResponse.error(message, [err.detail || err.message]));
});

export default app;
