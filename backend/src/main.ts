import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors('0.0.0.0')
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 3000)
}

bootstrap().catch((error: unknown) => {
  console.error('Error during bootstrap:', error)
})
