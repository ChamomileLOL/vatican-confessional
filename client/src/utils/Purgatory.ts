// THE INTERFACE OF THE WAITING SIN
export interface PendingSin {
    id: string;        // A temporary ID
    description: string;
    amount: string;
    timestamp: number;
}

const STORAGE_KEY = 'vatican_purgatory_queue';

export const Purgatory = {
    // 1. ADD TO QUEUE (Enter Purgatory)
    enqueue: (sin: PendingSin) => {
        const queue = Purgatory.getQueue();
        queue.push(sin);
        
        // STRICT ORDER: Sort by timestamp to ensure chronological replay
        queue.sort((a, b) => a.timestamp - b.timestamp);
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    },

    // 2. READ QUEUE
    getQueue: (): PendingSin[] => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    // 3. REMOVE SINGLE ITEM (Partial Ascension)
    dequeue: (id: string) => {
        const queue = Purgatory.getQueue();
        const newQueue = queue.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newQueue));
    },

    // 4. CLEAR QUEUE (Full Ascension)
    clear: () => {
        localStorage.removeItem(STORAGE_KEY);
    }
};