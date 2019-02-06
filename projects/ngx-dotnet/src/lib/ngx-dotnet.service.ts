import { Injectable } from '@angular/core';
import {
  DotnetApp,
  DotnetPreferences,
  Dotnet
} from './ngx-dotnet.models';

@Injectable()
export class NgxDotnetService {
  public async getApplicationAsync(
    preferences: DotnetPreferences
  ): Promise<DotnetApp> {
    const dotnetApp = Dotnet.getApplication(preferences);
    await this.bootstrapMonoRuntimeAsync(preferences.path);
    return dotnetApp;
  }

  private async bootstrapMonoRuntimeAsync(path: string) {
    const scriptElement = document.createElement('script');
    scriptElement.async = true;
    scriptElement.src = `${path}/mono.js`;
    const el = document.getElementsByTagName('script')[0];
    el.parentNode.insertBefore(scriptElement, el);
    await Dotnet.waitToReadyTask;
  }
}
