import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { NotesModule } from './notes.module';
import { LoggingMiddleware } from './logging.middleware';

@Module({
  imports: [NotesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}