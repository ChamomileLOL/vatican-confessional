import mongoose, { Document, Schema } from 'mongoose';

export interface ISin extends Document {
    description: string;
    amount: string;
    timestamp: Date;
    isAbsolved: boolean; // Tracks if this is a "Correction" entry
}

const SinSchema: Schema = new Schema({
    description: { type: String, required: true },
    amount: { 
        type: String, 
        required: true,
        validate: {
            // THE FIX: Added ^-? to allow negative numbers (Penance)
            validator: function(v: string) {
                return /^-?\d+(\.\d+)?$/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid Liturgical Number!`
        }
    },
    isAbsolved: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<ISin>('Sin', SinSchema);