import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, unique: true, uppercase: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: [true, 'Full name is required'], trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    address: { type: String },
    medicalHistory: { type: String, default: 'None' },
    // Removed default: null to fix Enum validation error
    bloodGroup: { 
      type: String, 
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] 
    },
    reportUrl: { type: String, default: null }, 
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

// Robust PTXXXXX ID Generation
patientSchema.pre('save', async function (next) {
  if (this.isNew && !this.patientId) {
    try {
      const lastPatient = await this.constructor.findOne().sort({ createdAt: -1 });
      let nextNumber = 1;
      if (lastPatient && lastPatient.patientId) {
        const lastIdNum = parseInt(lastPatient.patientId.replace('PT', ''));
        if (!isNaN(lastIdNum)) nextNumber = lastIdNum + 1;
      }
      this.patientId = `PT${String(nextNumber).padStart(5, '0')}`;
      next();
    } catch (err) { next(err); }
  } else {
    next();
  }
});

export default mongoose.model('Patient', patientSchema);