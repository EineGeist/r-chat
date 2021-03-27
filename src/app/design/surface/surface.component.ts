import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Inject,
    Input,
    OnInit,
    Optional,
    Self,
    SkipSelf,
} from '@angular/core';
import { DesignContext, DESIGN_CONTEXT } from '@design/design-context.provider';

@Component({
    selector: 'app-surface',
    templateUrl: './surface.component.html',
    styleUrls: ['./surface.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DESIGN_CONTEXT, useFactory: () => ({ level: 0 })}],
})
export class SurfaceComponent implements OnInit {
    @Input()
    set level(level: number | string) {
        this.designContext.level = +level;
        this.#level = level;
    }

    get level(): number | string {
        return this.#level;
    }

    @HostBinding('style.background-color')
    public get surface(): string {
        return `var(--surface${this.level})`;
    }

    @HostBinding('style.filter')
    public get shadow(): string {
        return `drop-shadow(var(--elevation${this.elevation}))`;
    }

    public parentDesignContext: DesignContext;

    public get elevation(): number {
        return +this.level - this.parentDesignContext.level;
    }

    #level: number | string = 1;

    constructor(
        @Inject(DESIGN_CONTEXT)
        @Self()
        public designContext: DesignContext,
        @Inject(DESIGN_CONTEXT)
        @SkipSelf()
        @Optional()
        parentDesignContext: DesignContext | null,
    ) {
        this.parentDesignContext = parentDesignContext || {
            level: 0,
        };
    }

    public ngOnInit(): void {
        this.level ??= 1;
    }
}
