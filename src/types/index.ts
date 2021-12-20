import { Request } from 'express'

export interface MulterRequest extends Request {
  file: Express.Multer.File;
}

interface IResponse<T> {
  readonly kind: T,
  readonly apply: (response: Express.Response) => void
}
