import { InjectionToken } from '@angular/core';

export interface DesignContext {
    level: number;
}

export const DESIGN_CONTEXT = new InjectionToken<DesignContext>('Design context');
