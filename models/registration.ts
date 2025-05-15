import mongoose, { Schema, Document } from 'mongoose';

export enum RegistrationType {
  SPONSOR = 'sponsor',
  EXHIBITOR = 'exhibitor',
  ATTENDEE = 'attendee'
}

export enum RegistrationMode {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export enum ContractStatus {
  PENDING = 'pending',
  SIGNED = 'signed',
  REJECTED = 'rejected',
  ARCHIVED = 'archived'
}

export interface IRegistration extends Document {
  type: RegistrationType;
  mode: RegistrationMode;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  email: string;
  password?: string;
  phoneNumber: string;
  country: string;
  state: string;
  industry: string;
  position?: string;
  companySize: string;
  contract?: string; // Path to contract file
  contractStatus?: ContractStatus;
  contractSignedAt?: Date;
  boothNumber?: string; // For exhibitors
  sponsorshipLevel?: string; // For sponsors
  additionalInfo?: Record<string, any>;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema: Schema = new Schema(
  {
    type: { type: String, enum: Object.values(RegistrationType), required: true },
    mode: { type: String, enum: Object.values(RegistrationMode), required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phoneNumber: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    industry: { type: String, required: true },
    position: { type: String },
    companySize: { type: String, required: true },
    contract: { type: String },
    contractStatus: { type: String, enum: Object.values(ContractStatus), default: ContractStatus.PENDING },
    contractSignedAt: { type: Date },
    boothNumber: { type: String },
    sponsorshipLevel: { type: String },
    additionalInfo: { type: Schema.Types.Mixed },
    role: { type: String, default: 'user' }
  },
  { timestamps: true }
);

export default mongoose.models.Registration || 
       mongoose.model<IRegistration>('Registration', RegistrationSchema);