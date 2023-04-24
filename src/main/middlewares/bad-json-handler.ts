import type { Request, Response, NextFunction } from 'express'
import { badRequest } from '../../presentation/helpers'

export const badJsonErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof SyntaxError && 'body' in err) {
    err.body = 'Invalid JSON Syntax'
    res.status(400).json({
      error: badRequest(err)
    })
  } else {
    next()
  }
}
