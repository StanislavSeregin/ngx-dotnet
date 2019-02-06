import { Component, OnInit } from '@angular/core';
import { NgxDotnetService, DotnetPreferences } from 'ngx-dotnet';
import { DotnetApp, DotnetMethodBinding } from 'ngx-dotnet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public output: string;
  public disabled = true;
  public dotnetApp: DotnetApp;

  constructor(
    private dotnetService: NgxDotnetService
  ) { }

  async ngOnInit() {
    this.output = 'Runtime loading...';
    const preferences: DotnetPreferences = {
      path: 'assets/dotnet',
      bin: 'bin',
      libraries: [
        'test.dll',
        'mscorlib.dll',
        'WebAssembly.Bindings.dll',
        'netstandard.dll',
        // 'System.Net.Http.dll',
        // 'System.dll',
        // 'Mono.Security.dll',
        // 'System.Xml.dll',
        // 'System.Numerics.dll',
        // 'System.Core.dll',
        // 'System.Data.dll',
        // 'System.Transactions.dll',
        // 'System.Drawing.dll',
        // 'System.IO.Compression.dll',
        // 'System.IO.Compression.FileSystem.dll',
        // 'System.ComponentModel.Composition.dll',
        // 'System.Runtime.Serialization.dll',
        // 'System.ServiceModel.Internals.dll',
        // 'System.Web.Services.dll',
        // 'System.Xml.Linq.dll',
        // 'WebAssembly.Net.Http.dll',
        // 'WebAssembly.Net.WebSockets.dll'
      ],
      bindings: [
        new DotnetMethodBinding('test', 'Math', 'IntAdd')
      ]
    };

    this.dotnetApp = await this.dotnetService.getApplicationAsync(
      preferences
    );

    this.disabled = false;
    this.output = '';
  }

  public callDotnetMethod() {
    this.output = '...';
    const res = this.dotnetApp.staticMethods.IntAdd(30, 20);
    this.output = `${res}`;
  }
}
