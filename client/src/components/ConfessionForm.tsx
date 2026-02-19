import React, { useState, useEffect } from 'react';
import { Purgatory, type PendingSin } from '../utils/Purgatory';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const ConfessionForm: React.FC = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState<string>('');
    const [globalDebt, setGlobalDebt] = useState<string>('Loading...');

    // 1. FETCH GLOBAL PENANCE
    const fetchPenance = async () => {
        try {
            const res = await fetch(`${API_URL}/api/v1/vatican/archive`);
            const data = await res.json();
            setGlobalDebt(data.totalDebt + " ETH");
        } catch (err) {
            setGlobalDebt("Connection Lost.");
        }
    };

    useEffect(() => { fetchPenance(); }, []);

    // 2. AUTO-SYNC (The Resurrection)
    useEffect(() => {
        const handleOnline = async () => {
            setStatus("Network Restored. Procession of Sins starting...");
            const queue = Purgatory.getQueue();
            if (queue.length === 0) return;

            for (const sin of queue) {
                try {
                    await fetch(`${API_URL}/api/v1/vatican/confess`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ description: sin.description + " (Delayed)", amount: sin.amount }),
                    });
                    Purgatory.dequeue(sin.id);
                } catch (e) {
                    console.error("Still unstable...");
                    return;
                }
            }
            setStatus("Purgatory Cleared. All sins recorded.");
            fetchPenance();
        };
        window.addEventListener('online', handleOnline);
        if (navigator.onLine && Purgatory.getQueue().length > 0) handleOnline();
        return () => window.removeEventListener('online', handleOnline);
    }, []);

    // 3. SUBMIT (Confess)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !description) return;
        setStatus("Transmitting...");

        try {
            const res = await fetch(`${API_URL}/api/v1/vatican/confess`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description, amount }),
            });
            if (res.ok) {
                setStatus("Absolved. The ledger is updated.");
                setDescription('');
                setAmount('');
                fetchPenance();
            } else {
                setStatus("Rejected: The sin format is heretical.");
            }
        } catch (err) {
            console.log("Network unreachable. Entering Purgatory.");
            const pending: PendingSin = { id: crypto.randomUUID(), description, amount, timestamp: Date.now() };
            Purgatory.enqueue(pending);
            setStatus("Offline Mode: Sin saved in Purgatory. Will sync automatically.");
            setDescription('');
            setAmount('');
        }
    };

    // 4. UNDO (The Mercy)
    const handleUndo = async () => {
        setStatus("Attempting to reverse time...");
        try {
            const res = await fetch(`${API_URL}/api/v1/vatican/undo`, { method: 'DELETE' });
            if (res.ok) {
                setStatus("The last transgression has been erased.");
                fetchPenance();
            } else {
                setStatus("There is nothing left to undo.");
            }
        } catch (err) {
            setStatus("Mercy is unavailable offline.");
        }
    };

    return (
        <div className="w-full max-w-md bg-slate-900 border-2 border-vatican-gold p-8 shadow-2xl rounded-sm">
            <div className="mb-8 text-center bg-slate-800 p-4 rounded border border-slate-700">
                <h3 className="text-slate-400 text-xs uppercase tracking-widest mb-1">Global Penance Required</h3>
                <p className="text-2xl font-mono text-white font-bold">{globalDebt}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">Nature of Sin</label>
                    <input 
                        type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Greed, Gluttony..."
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-3 focus:outline-none focus:border-vatican-gold transition-colors font-serif"
                    />
                </div>
                <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">Amount (Exact String)</label>
                    <input 
                        type="text" value={amount} onChange={(e) => { if (/^-?\d*\.?\d*$/.test(e.target.value)) setAmount(e.target.value); }}
                        placeholder="0.0000000"
                        className="w-full bg-slate-950 border border-slate-700 text-vatican-gold p-3 font-mono focus:outline-none focus:border-vatican-gold transition-colors"
                    />
                </div>
                <button type="submit" className="w-full bg-vatican-gold text-slate-950 font-bold py-3 uppercase tracking-widest hover:bg-yellow-500 transition-colors">
                    Confess
                </button>
            </form>

            {/* THE RESTORED UNDO BUTTON */}
            <button 
                onClick={handleUndo}
                className="w-full mt-4 bg-transparent border border-red-900 text-red-500 text-xs py-2 uppercase tracking-widest hover:bg-red-900/20 transition-colors"
            >
                Undo Last Transgression
            </button>

            {status && (
                <div className="mt-6 text-center text-xs font-mono p-2 border border-slate-800 text-slate-300">
                    {status}
                </div>
            )}
        </div>
    );
};

export default ConfessionForm;