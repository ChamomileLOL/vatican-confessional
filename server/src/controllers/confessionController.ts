import { Request, Response } from 'express';
import Sin from '../models/Sin';
import { holyAdd, holySubtract } from '../utils/HolyMath';

// --- GET: READ THE LEDGER ---
export const getArchive = async (req: Request, res: Response) => {
    try {
        const allSins = await Sin.find();
        let totalDebt = "0";
        
        // Sum every transaction in the database
        allSins.forEach(sin => {
            totalDebt = holyAdd(totalDebt, sin.amount);
        });

        // Return both keys to satisfy any frontend version
        res.json({ 
            totalDebt, 
            total_penance_required: totalDebt 
        });
    } catch (error) {
        res.status(500).json({ message: "The Archive is sealed." });
    }
};

// --- POST: SUBMIT A SIN ---
export const confess = async (req: Request, res: Response) => {
    try {
        const { description, amount } = req.body;
        
        if (!description || !amount) {
             return res.status(400).json({ message: "Empty confession." });
        }

        const newSin = new Sin({ description, amount });
        await newSin.save();

        res.status(201).json({ message: "Absolved." });
    } catch (error) {
        res.status(500).json({ message: "The confessional booth collapsed." });
    }
};

// --- POST: UNDO (THE SACRAMENT OF REVERSAL) ---
export const undoLastSin = async (req: Request, res: Response) => {
    try {
        // 1. Find the last submitted sin (sort by newest)
        // We ignore "Absolved" sins so we don't undo an undo.
        const lastSin = await Sin.findOne({ isAbsolved: { $ne: true } }).sort({ _id: -1 });

        if (!lastSin) {
            return res.status(400).json({ message: "No sins to undo. You are pure." });
        }

        // 2. Calculate the negative amount (0 - amount)
        const antiAmount = holySubtract("0", lastSin.amount);

        // 3. Create the "Anti-Sin" to balance the ledger
        const antiSin = new Sin({
            description: `REVERSAL OF: ${lastSin.description}`,
            amount: antiAmount,
            isAbsolved: true // Mark this as a correction
        });

        await antiSin.save();

        res.status(201).json({ 
            status: "ABSOLVED",
            message: "Time has been reversed." 
        });

    } catch (error) {
        console.error("Undo Error:", error);
        res.status(500).json({ message: "Divine Intervention Failed." });
    }
};