import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Self,
    SkipSelf,
} from '@angular/core';
import {
    of,
    combineLatest,
    Subscription,
    BehaviorSubject,
    Observable,
} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { DesignContext, DESIGN_CONTEXT } from '@design/design-context.provider';

@Component({
    selector: 'app-surface',
    templateUrl: './surface.component.html',
    styleUrls: ['./surface.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DESIGN_CONTEXT, useFactory: () => ({ level$: null }) }],
})
export class SurfaceComponent implements OnInit, OnDestroy {
    @Input()
    public set uplift(amount: number | string) {
        this.uplift$.next(+amount);
    }

    @Input()
    public upliftOnHoverBy?: number;

    @HostBinding('style.background-color')
    public surface!: string;

    @HostBinding('style.filter')
    public shadow!: string;

    private uplift$ = new BehaviorSubject(1);
    private level$: Observable<number>;
    private levelSubscription!: Subscription;

    private get parentLevel$(): Observable<number> {
        return this.parentDesignContext.level$;
    }

    constructor(
        @Inject(DESIGN_CONTEXT)
        @Self()
        private designContext: DesignContext,
        @Inject(DESIGN_CONTEXT)
        @SkipSelf() @Optional()
        private parentDesignContext: DesignContext,
        private changeDetectorRef: ChangeDetectorRef,
        private elementRef: ElementRef<HTMLElement>,
    ) {
        this.parentDesignContext ||= { level$: of(0) };
        this.level$ = combineLatest([this.uplift$, this.parentLevel$]).pipe(
            map(([uplift, parentLevel]) => parentLevel + uplift),
            shareReplay(),
        );
        this.designContext.level$ = this.level$;
    }

    public ngOnInit(): void {
        this.levelSubscription = combineLatest([this.level$, this.parentLevel$])
            .subscribe(([level, parentLevel]) => {
                const elevation = level - parentLevel;

                this.shadow = `drop-shadow(var(--surface${elevation}-shadow))`;
                this.surface = `var(--surface${level}-color)`;

                this.changeDetectorRef.detectChanges();
            });
    }

    public ngOnDestroy(): void {
        this.levelSubscription.unsubscribe();
    }

    @HostListener('mouseenter', ['$event'])
    public mouseOverHandler(event: MouseEvent): void {
        if (
            this.upliftOnHoverBy != null
            && this.elementRef.nativeElement === event.target
        ) {
            this.uplift$.next(this.uplift$.getValue() + this.upliftOnHoverBy);
        }
    }

    @HostListener('mouseleave', ['$event'])
    public mouseLeaveHandler(event: MouseEvent): void {
        if (
            this.upliftOnHoverBy != null
            && this.elementRef.nativeElement === event.target
        ) {
            this.uplift$.next(this.uplift$.getValue() - this.upliftOnHoverBy);
        }
    }
}
