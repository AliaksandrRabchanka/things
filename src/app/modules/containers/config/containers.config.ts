import { InjectionToken } from "@angular/core";

export const ContainersAPI = new InjectionToken<string>('ContainersAPI', {
    providedIn: 'root',
    factory: () => 'http://localhost:4201/containers'
})