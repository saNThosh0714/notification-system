import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { appRouterProviders } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorInterceptor } from '../error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(),provideHttpClient(withInterceptors([errorInterceptor]),withFetch())
  ,importProvidersFrom(FormsModule), ...appRouterProviders, provideAnimationsAsync()]
};
