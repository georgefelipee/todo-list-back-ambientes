import { AnnotationFactory } from '@aspectjs/common';

// Cria uma anotação de logging
export const LogExecution = new AnnotationFactory('logging').create('LogExecution');
