import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BclDependencies } from './bcl-dependencies';
import { RequiredBclDependencies } from './required-bcl-dependencies';
import {
  DotnetApp,
  DependencyDeclaration,
  DotnetPreferences,
  Dotnet
} from './ngx-dotnet.models';

@Injectable()
export class NgxDotnetService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public async getApplicationAsync<IDotnetAppMethods>(
    preferences: DotnetPreferences
  ): Promise<DotnetApp<IDotnetAppMethods>> {
    await this.initDependenciesAsync(preferences);
    const dotnetApp = Dotnet.getApplication<IDotnetAppMethods>(preferences);
    await this.bootstrapMonoRuntimeAsync(preferences.path);
    return dotnetApp;
  }

  private async initDependenciesAsync(preferences: DotnetPreferences) {
    RequiredBclDependencies.forEach(d => {
      preferences.bclDependencies.push(d);
    });

    if (preferences.dependencyDeclarationJsonName) {
      await this.actualizeDependenciesByDeclarationsAsync(preferences);
    }
  }

  private async actualizeDependenciesByDeclarationsAsync(preferences: DotnetPreferences) {
    const normalizedBclDependencies = BclDependencies.map(d => d.toLowerCase());
    const dependencyDeclarations = await this.getDependencyDeclarationsAsync(preferences);
    dependencyDeclarations.forEach(d => {
      if (d.serviceable) {
        const normalizedName = d.name.toLowerCase();
        const index = normalizedBclDependencies.indexOf(normalizedName);
        if (index >= 0) {
          const name = BclDependencies[index];
          preferences.bclDependencies.push(name);
        }
      } else {
        preferences.dependencies.push(d.name);
      }
    });
  }

  private async getDependencyDeclarationsAsync(
    preferences: DotnetPreferences
  ): Promise<Array<DependencyDeclaration>> {
    const result = await this.httpClient.get(
      `/${preferences.path}/${preferences.bin}/${preferences.dependencyDeclarationJsonName}.json`
    ).toPromise() as any;

    const dependencyDeclarations: Array<DependencyDeclaration> = [];
    for (const key in result.libraries) {
      if (result.libraries.hasOwnProperty(key)) {
        const l = result.libraries[key];
        const dep: DependencyDeclaration = {
          name: `${key.split('/')[0]}`,
          serviceable: l.serviceable
        };

        dependencyDeclarations.push(dep);
      }
    }

    return dependencyDeclarations;
  }

  private async bootstrapMonoRuntimeAsync(path: string) {
    const scriptElement = document.createElement('script');
    scriptElement.async = true;
    scriptElement.src = `${path}/dotnet.js`;
    const el = document.getElementsByTagName('script')[0];
    el.parentNode.insertBefore(scriptElement, el);
    await Dotnet.waitToReadyTask;
  }
}
