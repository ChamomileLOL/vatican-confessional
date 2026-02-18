import { Router } from 'express';
import { confess, getArchive, undoLastSin } from '../controllers/confessionController';

const router = Router();

// 1. GET /archive -> See the total debt
router.get('/archive', getArchive);

// 2. POST /confess -> Submit a sin
router.post('/confess', confess);

// 3. POST /undo -> The Sacrament of Reversal (THIS WAS LIKELY MISSING)
router.post('/undo', undoLastSin);

export default router;