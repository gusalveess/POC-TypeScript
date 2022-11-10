import {Request, Response,NextFunction} from 'express'

export function schemaValidationMiddleware(schema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const validation = schema.validate(req.body);
      if (validation.error) {
        res.status(409).send('Formato Inválido');
        return;
      }
      next();
    };
  }