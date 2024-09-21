import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('method executed!', {
      handler: context.getHandler().name,
      className: context.getClass().name,
    });

    return next.handle().pipe(
      map((data) => ({ status: 'success', data: data })),
      catchError((err) => {
        return of({
          status: 'fail',
          data: {
            name: err.name,
            message: err.message,
          },
        });
      }),
    );
  }
}
