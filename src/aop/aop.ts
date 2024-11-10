// aop.js
import { getWeaver } from '@aspectjs/core';
import { LogAspect } from './log.aspect.js';

getWeaver().enable(new LogAspect());
