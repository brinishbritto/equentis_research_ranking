import express, { Application, Request, Response, NextFunction } from 'express';
import { urlencoded } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import csurf from 'csurf';
import dotenv from 'dotenv';
dotenv.config();
import './configs/database';
import routes from './routes/LeadRoutes';

const app: Application = express();

// CORS
const allowedOrigins: string[] = ['https://www.equentis.com'];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Security Headers
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// CSRF Protection
app.use(csurf({ cookie: true }));

// Body Parsing
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/v1', routes);

// Error Handling Middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  }
);

// Redirect HTTP to HTTPS
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// Uncaught Exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception : ', error);
  process.exit(1);
});

// Unhandled Promise Rejections
process.on('unhandledRejection', (error: Error) => {
  console.error('Unhandled Promise Rejection : ', error);
  process.exit(1);
});

// Server
const port: string | number = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
