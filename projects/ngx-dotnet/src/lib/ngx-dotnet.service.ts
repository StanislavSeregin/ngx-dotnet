import { Injectable } from '@angular/core';
import {
  DotnetApp,
  DotnetSettings,
  Dotnet
} from './ngx-dotnet.models';

@Injectable()
export class NgxDotnetService {
  public async getApplicationAsync(
    dotnetLocation: string,
    dotnetSettings: DotnetSettings
  ): Promise<DotnetApp> {
    const dotnetApp = Dotnet.getApplication(dotnetSettings);
    await this.bootstrapMonoRuntimeAsync(dotnetLocation);
    return dotnetApp;
  }

  private async bootstrapMonoRuntimeAsync(dotnetLocation: string) {
    const scriptElement = document.createElement('script');
    scriptElement.async = true;
    scriptElement.src = `${dotnetLocation}/mono.js`;
    const el = document.getElementsByTagName('script')[0];
    el.parentNode.insertBefore(scriptElement, el);
    await this.monoRuntimeIsReadyAsync();
  }

  private async monoRuntimeIsReadyAsync(): Promise<void> {
    let isReady = false;
    const isReadyTaskFactory = () => new Promise<boolean>(resolve => {
      setTimeout(_ => {
        if (Dotnet.runtimeIsReady) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 100);
    });

    while (!isReady) {
      isReady = await isReadyTaskFactory();
    }
  }
}
