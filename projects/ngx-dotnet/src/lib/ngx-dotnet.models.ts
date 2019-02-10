import { EmbeddedDependency } from './embedded-dependency';

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

interface IDictionary<TValue> {
  [id: string]: TValue;
}

interface IMonoRuntime {
  onRuntimeInitialized(): void;
  mono_bindings_init(bootstrap: string): void;
  mono_bind_static_method(binding: string): any;
}

export class DotnetMethodBinding {
  constructor(
    public namespace: string,
    public className: string,
    public staticMethodName: string
  ) { }
}

export class DotnetApp {
  public staticMethods: IDictionary<Function>;
  constructor() {
    this.staticMethods = {};
  }
}

export class DotnetPreferences {
  public path: string;
  public bin: string;
  public embeddedDependencies: Array<EmbeddedDependency>;
  public dependencies: Array<string>;
  public bindings: Array<DotnetMethodBinding>;
}

// @dynamic
export class Dotnet {
  public static waitToReadyTask: Promise<void>;
  private static dotnetApp: DotnetApp;
  private static bindings: Array<DotnetMethodBinding>;
  private static runtime: IMonoRuntime;
  private static resolveWaitToReadyTask: Function;

  public static getApplication(dotnetSettings: DotnetPreferences): DotnetApp {
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
            dotnetSettings.dependencies.concat(dotnetSettings.embeddedDependencies),
            () => {
              const monoBinding = '[WebAssembly.Bindings]WebAssembly.Runtime';
              const _this = Dotnet;
              _this.runtime.mono_bindings_init(monoBinding);
              _this.bindings.forEach((b: DotnetMethodBinding) => {
                _this.dotnetApp.staticMethods[b.staticMethodName] = _this.runtime
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
