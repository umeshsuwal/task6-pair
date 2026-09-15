import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : undefined;

    let message = 'Internal server error';
    let details: unknown;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (exceptionResponse && typeof exceptionResponse === 'object') {
      const body = exceptionResponse as {
        message?: string | string[];
        error?: string;
      };
      if (Array.isArray(body.message)) {
        message = 'Validation failed';
        details = body.message;
      } else {
        message = body.message ?? body.error ?? message;
      }
    } else if (exception instanceof Error && statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      message = exception.message || message;
    }

    const errorCode =
      statusCode === HttpStatus.BAD_REQUEST && details
        ? 'ValidationError'
        : exception instanceof Error
          ? exception.name
          : 'InternalError';

    response.status(statusCode).json({
      error: {
        message,
        code: errorCode,
        ...(details ? { details } : {}),
        statusCode,
        path: request.url,
      },
    });
  }
}
