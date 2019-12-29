import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  DynamicExampleModule,
  DynamicConfig,
} from './dynamic-example/dynamic-example.module';

const config: DynamicConfig = {
  interceptorConfig: {
    interceptorName: 'fancyInterceptor',
  },
  serviceConfig: {
    serviceName: 'neatService',
    servicePort: 42,
  },
};

@Module({
  imports: [
    DynamicExampleModule.forRootAsync(DynamicExampleModule, {
      useFactory: () => config,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
