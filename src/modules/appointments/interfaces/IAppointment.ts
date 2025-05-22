

import { Document, Types } from "mongoose";

export type AppointmentStatus = "pending" | "accepted" | "rejected" | "cancelled" | "completed";

export interface IAppointment extends Document {
  client: Types.ObjectId;
  barber: Types.ObjectId;
  service: Types.ObjectId;
  date: Date;
  status: AppointmentStatus;
  createdAt?: Date;
}