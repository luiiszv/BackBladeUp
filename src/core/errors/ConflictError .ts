// src/core/errors/ConflictError.ts
import { HttpError } from "./HttpError";

export class ConflictError extends HttpError {
  constructor(message = "Data conflict: the requested action cannot be completed.") {
    super(message, 409); 
  }
}
