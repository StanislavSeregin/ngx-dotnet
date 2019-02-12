# ngx-dotnet

This is an angular wrapper of WebAssembly Mono Runtime.

  - Add this npm package to angular project
  - Configure some settings
  - Include .NET assembly to assets
  - Call native methods of .NET on client-side

## Installation

ngx-dotnet requires [Angular](https://angular.io/) v6+ to run.

#### Add ngx-dotnet dependency to package.json:
```javascript
{
  "dependencies": {
    ...
    "ngx-dotnet": "0.1.2"
  }
}
```

#### Configure angular.json:
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
        ...
      ]
    }
  }
}
```

## Setup

#### Put custom assemblies:
- Compile netstandard2.0 libraries as release mode
- Copy assemblies to 'assets/dotnet/bin'.

#### Import NgxDotnetModule:
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

#### Import types:

```typescript
import {
  NgxDotnetService,
  DotnetPreferences,
  DotnetApp,
  DotnetMethodBinding
} from 'ngx-dotnet';
```

#### Inject NgxDotnetService to constructor:

```typescript
constructor(
  private dotnetService: NgxDotnetService
) { }
```

#### Initialize preferences:

```typescript
const preferences: DotnetPreferences = {
  path: 'assets/dotnet', // Path to mono runtime
  bin: 'bin', // Directory witn all .NET assemblies
  // Strong typed .NET system assemblies
  embeddedDependencies: [
    'mscorlib.dll',
    'netstandard.dll',
    'WebAssembly.Bindings'
  ],
  // Your custom .NET assemblies from 'assets/dotnet/bin/'
  dependencies: [
    'YourClassLibrary.dll'
  ],
  // Registration bindings to public static methods of assemblies
  bindings: [
    new DotnetMethodBinding('SomeNamespace', 'SomeClass', 'SomePublicStaticMethod')
  ]
};
```

#### Get configured and bootstrapped .NET application:

```typescript
this.dotnetApp = await this.dotnetService.getApplicationAsync(
  preferences
);
```

#### Call native .NET methods:

```typescript
const res = this.dotnetApp.staticMethods.SomePublicStaticMethod();
```

License
----

MIT
