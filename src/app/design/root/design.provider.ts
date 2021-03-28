import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const DESIGN = new InjectionToken('Design values');
export interface Design {
    themes: {
        [theme: string]: {
            colors: { [color: string]: string };
            surfaces: {
                [level: number]: {
                    color: string;
                    shadow: string;
                },
            };
        };
    };
    currentTheme: BehaviorSubject<string>;
}
