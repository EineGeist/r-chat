import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface DesignContext {
    level$: Observable<number>;
}

export const DESIGN_CONTEXT = new InjectionToken<DesignContext>('Design context');
