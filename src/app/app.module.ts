import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDotnetModule } from 'ngx-dotnet';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxDotnetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
