import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			serveRoot: '/static',
			rootPath: join(__dirname, '..', 'static'),
		}),
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_CONNECTION),
		BooksModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
