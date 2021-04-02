import { Component } from '@angular/core';
import { DESIGN_CONTEXT } from '@design/design-context.provider';
import { of } from 'rxjs';

@Component({
    selector: 'des-background',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.scss'],
    providers: [{ provide: DESIGN_CONTEXT, useValue: { level$: of(0) } }],
})
export class BackgroundComponent {
}
