import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxDotnetService } from './ngx-dotnet.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    NgxDotnetService
  ]
})
export class NgxDotnetModule { }
