import type { Controller, HttpRequest } from '../../presentation/protocols'
import type { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    //  const reqAccountId: any = req
    const httpRequest: HttpRequest = {
      ...(req.body || {}),
      ...(req.params || {}),
      accountId: (req as any).accountId
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
