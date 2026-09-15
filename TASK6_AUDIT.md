# Task 6 Audit

## Target

NestJS Notes API in `src/`.

## Findings Before Refactoring

- The controller already used Nest exceptions for missing notes, but there was no application-level exception filter.
- Not-found responses used Nest's default error shape, while validation failures from `ValidationPipe` used a different default shape. There was no consistent error envelope.
- `LoggingMiddleware` logged every completed request, but formatted the method, path, status, and duration as one plain-text string rather than structured fields.
- The in-memory service handles missing records by returning `undefined`; the controller converts those cases to `NotFoundException`, so those failures do not silently hang or crash the process.
- DTO validation was enabled globally with `whitelist` and `forbidNonWhitelisted`, so invalid input was rejected before the controller ran.

## Refactor Plan

1. Add one global exception filter that preserves HTTP status codes and returns a consistent `error` envelope.
2. Preserve the controller and service route behavior while allowing Nest exceptions to reach the filter.
3. Keep request logging on the response `finish` event and emit method, path, status code, and duration as structured JSON.
4. Verify successful CRUD routes, validation failure, and not-found failure.
