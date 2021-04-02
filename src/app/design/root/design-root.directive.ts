import {
    Directive,
    HostBinding,
    Inject,
    OnDestroy,
    SecurityContext,
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Design, DESIGN } from './design.provider';

type CssVariables = { [variable: string]: string };

@Directive({
    selector: '[desRoot]',
})
export class DesignRootDirective implements OnDestroy {
    @HostBinding('style')
    public rootVariables!: SafeStyle;

    private subscription: Subscription;

    constructor(
    @Inject(DESIGN)
        design: Design,
        sanitizer: DomSanitizer,
    ) {
        this.subscription = design.currentTheme.subscribe(theme => {
            const { colors, surfaces } = design.themes[theme];
            const cssVariables: CssVariables = {};

            Object.entries(colors).forEach(([name, value]) => {
                cssVariables[`--color-${name}`] = value;
            });

            Object.entries(surfaces).forEach(([level, { color, shadow }]) => {
                cssVariables[`--surface${level}-color`] = color;
                cssVariables[`--surface${level}-shadow`] = shadow;
            });

            this.rootVariables = sanitizer.sanitize(SecurityContext.STYLE, cssVariables) as string;
        });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
