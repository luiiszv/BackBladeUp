
import { HttpError } from "./HttpError";

export class ForbiddenError extends HttpError {
  constructor(message = "Access forbidden") {
    super(message, 403);
  }
}
