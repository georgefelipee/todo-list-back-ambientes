import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomErro.ts';

export function errorHandler(err: Error | CustomError, req: Request, res: Response, next: NextFunction): void {
    // Verifica se o erro é uma instância de CustomError
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        // Para outros erros, define o status 500 e uma mensagem genérica
        console.error(err); // Loga o erro no servidor
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
