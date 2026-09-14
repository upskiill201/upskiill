import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let message = 'An unexpected error occurred.';
    let extraFields: Record<string, unknown> = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const obj = res as any;
        message = obj.message || message;
        errorCode = obj.error || obj.code || this.getErrorCodeFromStatus(status);
        if (Array.isArray(message)) {
          message = message.join(', ');
        }
        // Services throw extra context alongside message/code (e.g. requiresVerification,
        // email, canLink, isVerified) — callers across the app read these at the top
        // level of the response, so they must survive the envelope, not just message/code.
        const { message: _m, error: _e, code: _c, statusCode: _s, ...rest } = obj;
        extraFields = rest;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      error: {
        code: errorCode,
        message,
      },
      ...extraFields,
    });
  }

  private getErrorCodeFromStatus(status: number): string {
    switch (status) {
      case 400:
        return 'BAD_REQUEST';
      case 401:
        return 'UNAUTHORIZED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      case 409:
        return 'CONFLICT';
      default:
        return 'SERVER_ERROR';
    }
  }
}
