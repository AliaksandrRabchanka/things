import { InjectionToken } from "@angular/core";

export const ThingsAPI = new InjectionToken<string>('ThingsAPI', {
    providedIn: 'root',
    factory: () => 'http://localhost:4201/things'
})