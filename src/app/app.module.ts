import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DesignModule } from 'src/design/design.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        DesignModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
