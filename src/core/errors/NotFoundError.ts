
import { HttpError } from "./HttpError";

export class NotFoundError extends HttpError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404);
  }
}
