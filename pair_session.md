# Pair Session - Phase 5 Task 6

**Pair:** Umesh Suwal & Akash Bhandari  
**Repo:** task-6  
**Target:** NestJS Notes API from `notes-api`  
**Date:** Day 5 (afternoon)  
**Format:** Driver / Navigator, swap every 15 minutes

## 1. Driver Log

| # | Time | Driver | Navigator | Segment |
|---|---|---|---|---|
| 1 | 0-15 min | Umesh Suwal | Akash Bhandari | Audited existing exceptions and logging |
| 2 | 15-30 min | Akash Bhandari | Umesh Suwal | Implemented the global exception filter |
| 3 | 30-45 min | Umesh Suwal | Akash Bhandari | Refactored structured request logging |
| 4 | 45-60 min | Akash Bhandari | Umesh Suwal | Tested successful and failure routes |
| 5 | 60-75 min | Umesh Suwal | Akash Bhandari | Reviewed behavior and documentation |

Both partners drove alternating 15-minute segments.

## 2. Audit Findings Before Refactoring

- The controllers used Nest exceptions for missing notes, but there was no application-level exception filter.
- Not-found and validation failures used different default response shapes, so errors were not consistent.
- The logging middleware recorded requests as plain text instead of structured fields.
- The service returned `undefined` for missing records, and the controller converted those cases to not-found exceptions.
- Global DTO validation was already enabled with `whitelist` and `forbidNonWhitelisted`.

## 3. Refactor Plan and Result

1. Add one global exception filter for a consistent `error` response envelope.
2. Preserve the existing controller routes and service behavior.
3. Log method, path, status code, and duration as structured JSON.
4. Test successful CRUD requests, invalid input, and a missing note.

## 4. Verification

- Successful create, list, fetch, update, and delete requests passed.
- Invalid input returned `400 ValidationError` with validation details.
- A missing note returned `404 NotFoundException` in the common error envelope.
- Request logs included method, path, status code, and duration.

See [TASK6_AUDIT.md](TASK6_AUDIT.md) for the full audit and [README.md](README.md) for setup instructions.
