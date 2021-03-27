import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurfaceComponent } from './surface/surface.component';

@NgModule({
    declarations: [SurfaceComponent],
    exports: [SurfaceComponent],
    imports: [
        CommonModule,
    ],
})
export class DesignModule { }
