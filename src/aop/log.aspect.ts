import { Before, After, Aspect, on } from '@aspectjs/core';
import { LogExecution } from './log.annotation.ts'; // Certifique-se de que isso também seja .ts

@Aspect()
export class LogAspect {
    @Before(on.methods.withAnnotations(LogExecution))
    logBefore(context: any): void {
        console.log(`Executando: ${context.target.label}`);
        console.log(`Argumentos: ${JSON.stringify(context.args)}`);
    }

    @After(on.methods.withAnnotations(LogExecution))
    logAfter(context: any): void {
        console.log(`Método ${context.target.label} finalizado`);
        console.log(`Resultado: ${JSON.stringify(context.result)}`);
    }
}
