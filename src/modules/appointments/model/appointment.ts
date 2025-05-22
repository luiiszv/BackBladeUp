// src/modules/appointment/models/Appointment.ts
import { Schema, model, Types } from 'mongoose';
import { IAppointment } from "../interfaces/IAppointment";
const AppointmentSchema = new Schema<IAppointment>({

  client: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  barber: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const AppointmentModel = model<IAppointment>('Appointments', AppointmentSchema);
