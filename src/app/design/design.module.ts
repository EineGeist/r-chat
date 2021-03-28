import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { SurfaceComponent } from './surface/surface.component';
import { DesignRootDirective } from './root/design-root.directive';
import { Design, DESIGN } from './root/design.provider';

@NgModule({
    declarations: [
        SurfaceComponent,
        DesignRootDirective,
    ],
    exports: [
        SurfaceComponent,
        DesignRootDirective,
    ],
    imports: [
        CommonModule,
    ],
    providers: [
        {
            provide: DESIGN,
            useValue: <Design>{
                currentTheme: new BehaviorSubject('dark'),
                themes: {
                    dark: {
                        colors: {
                            primary: '#7fd7ff',
                            'primary-variant': '#00adfc',
                            secondary: '#ffa87f',
                            error: '#ff7f88',

                            'on-surface': '#ffffff',
                            'on-primary': '#000000',
                        },
                        surfaces: {
                            0: {
                                color: '#000000',
                                shadow: '0 2px 2px #000000',
                            },
                            1: {
                                color: '#1e1e1e',
                                shadow: '0 2px 4px #000000',
                            },
                            2: {
                                color: '#262626',
                                shadow: '0 2px 6px #000000',
                            },
                            3: {
                                color: '#2d2d2d',
                                shadow: '0 2px 8px #000000',
                            },
                            4: {
                                color: '#353535',
                                shadow: '0 2px 10px #000000',
                            },
                            5: {
                                color: '#3a3a3a',
                                shadow: '0 2px 12px #000000',
                            },
                        },
                    },
                },
            },
        },
    ],
})
export class DesignModule { }
