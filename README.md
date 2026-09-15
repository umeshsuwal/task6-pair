# Phase 5 Task 6 - Error Handling and Logging Refactor

Pair: Umesh Suwal and Akash Bhandari  
Target: NestJS Notes API from `notes-api`  
Format: Driver / Navigator, swap every 15 minutes

## What Changed

- Added a global exception filter in `src/http-exception.filter.ts`.
- Standardized validation, not-found, and unexpected failures under an `error` envelope.
- Updated request logging to emit JSON containing method, path, status code, and duration.
- Preserved the existing controller routes and in-memory service behavior.

## Routes Preserved

- `GET /notes` returns all notes.
- `GET /notes/:id` returns one note or a not-found error.
- `POST /notes` creates a validated note.
- `PUT /notes/:id` updates a note or returns a not-found error.
- `DELETE /notes/:id` deletes a note or returns a not-found error.

## Error Envelope

Example validation response:

```json
{
  "error": {
    "message": "Validation failed",
    "code": "ValidationError",
    "details": ["text is required"],
    "statusCode": 400,
    "path": "/notes"
  }
}
```

## Verification

```bash
npm install
npm start
```

Verified manually:

- Successful create, list, fetch, update, and delete requests.
- Invalid note input returns `400` with `ValidationError`.
- A missing note returns `404` with `NotFoundException`.
- Request logs include method, path, status code, and duration for successful and failed requests.

See [TASK6_AUDIT.md](TASK6_AUDIT.md) for the pre-refactor audit and [PAIRING.md](PAIRING.md) for the driver log.
