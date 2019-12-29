import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  DynamicServiceConfig,
  DynamicInterceptorConfig,
  DYNAMIC_CONFIG_TOKEN,
  SERVICE_CONFIG_TOKEN,
  INTERCEPTOR_CONFIG_TOKEN,
} from './dynamic-example/dynamic-example.module';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(SERVICE_CONFIG_TOKEN)
    private readonly serviceConfig: DynamicServiceConfig,
    @Inject(INTERCEPTOR_CONFIG_TOKEN)
    private readonly interceptorConfig: DynamicInterceptorConfig,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('service')
  getServiceConfig() {
    return this.serviceConfig;
  }

  @Get('interceptor')
  getInterceptorConfig() {
    return this.interceptorConfig;
  }
}
