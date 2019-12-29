import { Module } from '@nestjs/common';
import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';

export const DYNAMIC_CONFIG_TOKEN = Symbol('DynamicConfigToken');
export const SERVICE_CONFIG_TOKEN = Symbol('ServiceConfigToken');
export const INTERCEPTOR_CONFIG_TOKEN = Symbol('InterceptorConfigToken');

export interface DynamicServiceConfig {
  servicePort: number;
  serviceName: string;
}

export interface DynamicInterceptorConfig {
  interceptorName: string;
}

export interface DynamicConfig {
  serviceConfig: DynamicServiceConfig;
  interceptorConfig: DynamicInterceptorConfig;
}

export class DynamicExampleModule extends createConfigurableDynamicRootModule<
  DynamicExampleModule,
  DynamicConfig
>(DYNAMIC_CONFIG_TOKEN, {
  providers: [
    {
      provide: SERVICE_CONFIG_TOKEN,
      useFactory: (config: DynamicConfig) => config.serviceConfig,
      inject: [DYNAMIC_CONFIG_TOKEN],
    },
    {
      provide: INTERCEPTOR_CONFIG_TOKEN,
      useFactory: (config: DynamicConfig) => config.interceptorConfig,
      inject: [DYNAMIC_CONFIG_TOKEN],
    },
  ],
  exports: [SERVICE_CONFIG_TOKEN, INTERCEPTOR_CONFIG_TOKEN],
}) {}
