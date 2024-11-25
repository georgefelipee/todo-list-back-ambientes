// import { Request, Response, NextFunction } from 'express';
// import { CustomError } from '../utils/CustomErro.ts';

// export function errorHandler(err: Error | CustomError, req: Request, res: Response, next: NextFunction): void {
//     // Verifica se o erro é uma instância de CustomError
//     if (err instanceof CustomError) {
//         res.status(err.statusCode).json({ message: err.message });
//     } else {
//         // Para outros erros, define o status 500 e uma mensagem genérica
//         console.error(err); // Loga o erro no servidor
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomErro";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    const adaptedError = adaptError(err);
    res.status(adaptedError.statusCode).json({ message: adaptedError.message });
}

function adaptError(err: Error): CustomError {
    // Adapta erros genéricos ou de bibliotecas para o formato CustomError
    if (err.name === "ValidationError") {
        return new CustomError("Validation Error: " + err.message, 400);
    }
    if (err.name === "DatabaseError") {
        return new CustomError("Database Error: " + err.message, 500);
    }
    // Outros casos de adaptação podem ser adicionados
    return new CustomError("Internal Server Error", 500);
}
