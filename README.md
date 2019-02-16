# ngx-dotnet

This is an angular wrapper of WebAssembly Mono Runtime.

  - Add this npm package to angular project
  - Configure some settings
  - Put .NET assembly to assets
  - Call native methods of .NET on client-side


## Installation

ngx-dotnet requires [Angular](https://angular.io/) v6+ to run.


#### Add ngx-dotnet dependency to package.json:
```javascript
{
  "dependencies": {
    ...
    "ngx-dotnet": "0.2.0"
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

#### Copy built files:
- Compile netstandard2.0 libraries as release mode
- Copy *.dll and *.deps.json from 'bin/Release/netstandard2.0' to 'assets/dotnet/bin'.


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
const preferences = new DotnetPreferences(
  'assets/dotnet', // Path to mono runtime
  'bin', // Directory witn target .NET assemblies (full path 'assets/dotnet/bin')
  'DotnetDemo.deps', // Json which contains of the necessary dependencies
  // Bindings to public static methods
  [
    new DotnetMethodBinding('SomeNamespace', 'SomeClass', 'SomePublicStaticMethodName'),
    new DotnetMethodBinding('SomeNamespace', 'SomeClass', 'OtherPublicStaticMethodNameAsync'),
    ...
  ]
);
```


#### Declare interface of methods

```typescript
interface IDotnetAppMethods {
  // Sample synchronous method signature
  SomePublicStaticMethodName(parameter: number): string;

  // Sample asynchronous method signature
  OtherPublicStaticMethodNameAsync(parameter: string): Promise<Array<number>>;
  ...
}
```


#### Get configured and bootstrapped .NET application:

```typescript
const dotnetApp = await this.dotnetService.getApplicationAsync<IDotnetAppMethods>(
  preferences
);
```


#### Call native .NET methods:

```typescript
const text = dotnetApp.methods.SomePublicStaticMethodName(123);
const numbers = await dotnetApp.methods.OtherPublicStaticMethodNameAsync(text);
```

License
----

MIT
