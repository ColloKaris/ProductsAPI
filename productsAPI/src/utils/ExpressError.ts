export class ExpressError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    
    Object.setPrototypeOf(this, ExpressError.prototype) // ensures ExpressError
    // instances inehrit the prototype chain correctly
  }
}