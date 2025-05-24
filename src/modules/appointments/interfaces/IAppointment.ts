

import { Document, Types } from "mongoose";

export type AppointmentStatus = "pending" | "accepted" | "rejected" | "cancelled" | "completed";

export interface IAppointment extends Document {
  client: string;
  barber: string;
  service: string;
  date: Date;
  status: AppointmentStatus;
  createdAt?: Date;
}