export class DotnetMethodBinding {
  public namespace: string;
  public class: string;
  public staticMethod: string;
}

interface IDictionary<TValue> {
  [id: string]: TValue;
}

export class DotnetApp {
  constructor() {
    this.staticMethods = {};
  }

  public staticMethods: IDictionary<Function>;
}

export interface IMonoRuntime {
  onRuntimeInitialized(): void;
  mono_bindings_init(bootstrap: string): void;
  mono_bind_static_method(binding: string): any;
}

export class DotnetSettings {
  public libSubfolder: string;
  public libs: Array<string>;
  public bindings: Array<DotnetMethodBinding>;
}

declare var MONO: any;
// @dynamic
export class Dotnet {
  public static runtimeIsReady: boolean;

  private static dotnetApp: DotnetApp;
  private static bindings: Array<DotnetMethodBinding>;
  private static runtime: IMonoRuntime;

  public static getApplication(dotnetSettings: DotnetSettings): DotnetApp {
    if (!this.dotnetApp) {
      this.initialization(dotnetSettings);
    }

    return this.dotnetApp;
  }

  private static initialization(dotnetSettings: DotnetSettings) {
    this.dotnetApp = new DotnetApp();
    this.bindings = dotnetSettings.bindings;
    this.runtime = {
      onRuntimeInitialized: () => {
        MONO.mono_load_runtime_and_bcl(
          dotnetSettings.libSubfolder,    // vfs prefix
          dotnetSettings.libSubfolder,    // deploy prefix
          0,                              // enable debugging
          dotnetSettings.libs,            // file list
          this.initDotnetBindings         // bindings function
        );
      }
    } as IMonoRuntime;

    window['Module'] = this.runtime;
  }

  private static initDotnetBindings() {
    const monoBinding = '[WebAssembly.Bindings]WebAssembly.Runtime';
    const _this = Dotnet;
    _this.runtime.mono_bindings_init(monoBinding);
    _this.bindings.forEach((b: DotnetMethodBinding) => {
      _this.dotnetApp.staticMethods[b.staticMethod] = _this.runtime
        .mono_bind_static_method(
          `[${b.namespace}] ${b.class}:${b.staticMethod}`
        );
    });

    _this.runtimeIsReady = true;
  }
}
