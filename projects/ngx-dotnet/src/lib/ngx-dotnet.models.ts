import { BclDependency } from './bcl-dependency';

declare const MONO: IMONO;
interface IMONO {
  mono_load_runtime_and_bcl(
    vfsPrefix: string,
    deployPrefix: string,
    enableDebugging: number,
    libraries: Array<string>,
    bindingsAction: Function
  ): void;
}

interface IMonoRuntime {
  onRuntimeInitialized(): void;
  mono_bindings_init(binding: string): void;
  mono_bind_static_method(binding: string): any;
}

export class DotnetMethodBinding {
  constructor(
    public namespace: string,
    public className: string,
    public staticMethodName: string
  ) { }
}

export class DotnetApp<IDotnetAppMethods> {
  methods: IDotnetAppMethods;
  constructor() {
    this.methods = {} as IDotnetAppMethods;
  }
}

export class DotnetPreferences {
  constructor(
    public path: string,
    public bin: string,
    public dependencyDeclarationJsonName: string,
    public bindings: Array<DotnetMethodBinding>,
    public bclDependencies: Array<BclDependency> = [],
    public dependencies: Array<string> = []
  ) { }
}

export class DependencyDeclaration {
  public name: string;
  public serviceable: boolean;
}

// @dynamic
export class Dotnet {
  public static waitToReadyTask: Promise<void>;
  private static dotnetApp: DotnetApp<any>;
  private static bindings: Array<DotnetMethodBinding>;
  private static runtime: IMonoRuntime;
  private static resolveWaitToReadyTask: Function;

  public static getApplication<IDotnetAppMethods>(
    dotnetSettings: DotnetPreferences
  ): DotnetApp<IDotnetAppMethods> {
    this.waitToReadyTask = new Promise(resolve => {
      this.resolveWaitToReadyTask = resolve;
    });

    if (!this.dotnetApp) {
      this.dotnetApp = new DotnetApp();
      this.bindings = dotnetSettings.bindings;
      this.runtime = {
        onRuntimeInitialized: () => {
          MONO.mono_load_runtime_and_bcl(
            dotnetSettings.bin,
            dotnetSettings.bin,
            0,
            dotnetSettings.dependencies
              .concat(dotnetSettings.bclDependencies)
              .map(d => `${d}.dll`),
            () => {
              const wasmBindingsLib: BclDependency = 'WebAssembly.Bindings';
              const wasmBinding = `[${wasmBindingsLib}]WebAssembly.Runtime`;
              const _this = Dotnet;
              _this.runtime.mono_bindings_init(wasmBinding);
              _this.bindings.forEach((b: DotnetMethodBinding) => {
                _this.dotnetApp.methods[b.staticMethodName] = _this.runtime
                  .mono_bind_static_method(
                    `[${b.namespace}] ${b.namespace}.${b.className}:${b.staticMethodName}`
                  );
              });

              _this.resolveWaitToReadyTask();
            }
          );
        }
      } as IMonoRuntime;

      window['Module'] = this.runtime;
    } else {
      this.resolveWaitToReadyTask();
    }

    return this.dotnetApp;
  }
}
