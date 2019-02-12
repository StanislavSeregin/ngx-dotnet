import { Component, OnInit } from '@angular/core';
import {
  NgxDotnetService,
  DotnetPreferences,
  DotnetApp,
  DotnetMethodBinding
} from 'ngx-dotnet';

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
      embeddedDependencies: [
        'mscorlib.dll',
        'netstandard.dll',
        'WebAssembly.Bindings.dll',
      ],
      dependencies: [
        'DotnetDemo.dll'
      ],
      bindings: [
        new DotnetMethodBinding('DotnetDemo', 'SomeClass', 'CounterNext'),
        new DotnetMethodBinding('DotnetDemo', 'SomeClass', 'GetNewGuid')
      ]
    };

    this.dotnetApp = await this.dotnetService.getApplicationAsync(
      preferences
    );

    this.disabled = false;
    this.output = '';
  }

  public incrementCounter() {
    this.output = '...';
    const res = this.dotnetApp.staticMethods.CounterNext();
    this.output = `${res}`;
  }

  public getNewGuid() {
    this.output = '...';
    const res = this.dotnetApp.staticMethods.GetNewGuid();
    this.output = `${res}`;
  }
}
