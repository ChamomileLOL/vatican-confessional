import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import helmet from 'helmet'; // Helmet usually has a default export, keep it for now
import connectDB from './config/db';
import confessionRoutes from './routes/confessionRoutes';

dotenv.config();
connectDB();

const app = express();

app.use(helmet()); // Divine Shield
app.use(cors());   // Universal Communion
app.use(express.json());

// ROUTES
app.use('/api/v1/vatican', confessionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`[PONTIFEX] The Confessional is open on port ${PORT}`);
    console.log(`[PONTIFEX] Strict Equality Level: 10,000 Billion%`);
});