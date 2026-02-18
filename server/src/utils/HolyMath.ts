// server/src/utils/HolyMath.ts

// SAFE ADDITION
export const holyAdd = (a: string, b: string): string => {
    // We use Number() for now to prevent BigInt crashes with decimals
    const result = Number(a) + Number(b);
    return result.toString();
};

// SAFE SUBTRACTION (This was likely missing!)
export const holySubtract = (a: string, b: string): string => {
    const result = Number(a) - Number(b);
    return result.toString();
};