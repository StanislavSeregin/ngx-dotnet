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
  public namespace: string;
  public class: string;
  public staticMethod: string;
}

export class DotnetApp {
  public staticMethods: IDictionary<Function>;
  constructor() {
    this.staticMethods = {};
  }
}

export class DotnetSettings {
  public libSubfolder: string;
  public libs: Array<string>;
  public bindings: Array<DotnetMethodBinding>;
}

// @dynamic
export class Dotnet {
  public static waitToReadyTask: Promise<void>;
  private static dotnetApp: DotnetApp;
  private static bindings: Array<DotnetMethodBinding>;
  private static runtime: IMonoRuntime;
  private static resolveWaitToReadyTask: Function;

  public static getApplication(dotnetSettings: DotnetSettings): DotnetApp {
    this.waitToReadyTask = new Promise(resolve => {
      this.resolveWaitToReadyTask = resolve;
    });

    if (!this.dotnetApp) {
      this.dotnetApp = new DotnetApp();
      this.bindings = dotnetSettings.bindings;
      this.runtime = {
        onRuntimeInitialized: () => {
          MONO.mono_load_runtime_and_bcl(
            dotnetSettings.libSubfolder,
            dotnetSettings.libSubfolder,
            0,
            dotnetSettings.libs,
            () => {
              const monoBinding = '[WebAssembly.Bindings]WebAssembly.Runtime';
              const _this = Dotnet;
              _this.runtime.mono_bindings_init(monoBinding);
              _this.bindings.forEach((b: DotnetMethodBinding) => {
                _this.dotnetApp.staticMethods[b.staticMethod] = _this.runtime
                  .mono_bind_static_method(
                    `[${b.namespace}] ${b.class}:${b.staticMethod}`
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
