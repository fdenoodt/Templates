import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { MainComponent } from './main/main.component';

import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WarnerService } from './shared/warning/warner.service';
import { AuthGuard } from './auth/guards/auth-guard.service';
import { AuthService } from './auth/services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    SharedModule,
    AuthModule,

    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,

  ],
  providers: [
    WarnerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
