# ngx-dotnet

This is an angular wrapper of web assembly mono runtime.

  - Add this npm package to your angular project
  - Configure some settings
  - Include your .Net assembly to assets of project
  - Call native methods of .Net on client-side.

### Installation

ngx-dotnet requires [Angular](https://angular.io/) v6+ to run.

Add ngx-dotnet dependency to package.json of existed angular project:
```javascript
{
  "dependencies": {
    ...
    "ngx-dotnet": "0.1.0"
  }
}
```

Configure angular.json for copying *.dll and mono runtime to assets:
```javascript
...
"architect": {
  "build": {
    "options": {
      "assets": [
        // Past before all assets
        {
          "glob": "**/*",
          "input": "node_modules/ngx-dotnet/assets",
          "output": "assets/dotnet"
        },
        // other assets
      ]
    }
  }
}
```

### Setup application to launch .Net

Import NgxDotnetModule to your module:
```typescript
import { NgxDotnetModule } from 'ngx-dotnet';

@NgModule({
  ...
  imports: [
    ...
    NgxDotnetModule
  ],
  ...
})
```

Compile and copy your netstandard2.0 library to 'assets/dotnet/bin'.

Inject NgxDotnetService to your component and setup preferences:
```typescript
import {
  NgxDotnetService,
  DotnetPreferences,
  DotnetApp,
  DotnetMethodBinding
} from 'ngx-dotnet';

...

export class SomeComponent implements OnInit {
  public dotnetApp: DotnetApp;

  constructor(
    private dotnetService: NgxDotnetService
  ) { }

  async ngOnInit() {
    const preferences: DotnetPreferences = {
      // Path to mono runtime
      path: 'assets/dotnet',
      // Directory witn all .net assemblies
      bin: 'bin',
      // Strong types .net system assemblies
      embeddedDependencies: [
        'mscorlib.dll',
        'netstandard.dll',
        'WebAssembly.Bindings'
      ],
      // Your custom .net assemblies from 'assets/dotnet/bin/'
      dependencies: [
        'YourClassLibrary.dll'
      ],
      // Registration bindings to public static methods of your assembly
      bindings: [
        new DotnetMethodBinding('SomeNamespace', 'SomeClass', 'SomePublicStaticMethod')
      ]
    };

    // await to load and initialization of mono runtime
    this.dotnetApp = await this.dotnetService.getApplicationAsync(
      preferences
    );
  }

  public SomeMethod(): string {
    // Call native .net method by name
    const res = this.dotnetApp.staticMethods.SomePublicStaticMethod();
    this.output = `${res}`;
  }
}
```

License
----

MIT
