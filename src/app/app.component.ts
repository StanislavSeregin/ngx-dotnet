import { Component, OnInit } from '@angular/core';
import {
  NgxDotnetService,
  DotnetPreferences,
  DotnetApp,
  DotnetMethodBinding
} from 'ngx-dotnet';

interface IDotnetAppMethods {
  CounterNext(): number;
  GetNewGuid(): string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public output: string;
  public disabled = true;
  public dotnetApp: DotnetApp<IDotnetAppMethods>;

  constructor(
    private dotnetService: NgxDotnetService
  ) { }

  async ngOnInit() {
    this.output = 'Runtime loading...';
    await this.InitDotnetAppAsync();
    this.disabled = false;
    this.output = '';
  }

  private async InitDotnetAppAsync() {
    const preferences = new DotnetPreferences(
      'assets/dotnet',
      'bin',
      'DotnetDemo.deps',
      [
        new DotnetMethodBinding('DotnetDemo', 'SomeClass', 'CounterNext'),
        new DotnetMethodBinding('DotnetDemo', 'SomeClass', 'GetNewGuid')
      ]
    );

    this.dotnetApp = await this.dotnetService.getApplicationAsync<IDotnetAppMethods>(
      preferences
    );
  }

  public incrementCounter() {
    const count = this.dotnetApp.methods.CounterNext();
    this.output = `${count}`;
  }

  public getNewGuid() {
    const guid = this.dotnetApp.methods.GetNewGuid();
    this.output = `${guid}`;
  }
}
