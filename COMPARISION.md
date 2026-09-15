# Express vs NestJS — Comparison

## Which felt faster to get a basic route working

Express, by a wide margin. On Task 1, I had a working `GET`/`POST`
route with Zod validation in maybe 20 minutes — install Express and
Zod, write a function, done. NestJS's Task 3 skeleton took longer
before a single request even worked, because I had to understand the
Module/Controller/Service split, get TypeScript's decorator config
right in `tsconfig.json`, and only then write the actual route logic.
For a single endpoint, Express wins on raw speed to "hello world."

## Where NestJS's structure genuinely helped

The validation setup is where NestJS actually paid off, once it was
wired up. In Express, my Zod schema and my TypeScript type (if I'd
been using TS) would have been two separate things I had to keep in
sync manually. In NestJS, the `CreateNoteDto` class IS the type AND
the validation rules — `@IsString() @IsNotEmpty() text: string`
defines the shape and the constraint in one place. When I tested
sending an unexpected extra field (`hacker: "field"`) with
`whitelist: true` enabled, NestJS rejected it automatically with zero
extra code. Reproducing that in Express would mean writing that logic
into the Zod schema myself with `.strict()` or similar — doable, but
not free the way it was here.

## Where Express's flexibility helped

Express never made me decide anything I didn't want to think about.
There's no "correct NestJS way" to structure a tiny 5-route API — I
had to learn what a Module even is before I could put a single route
behind one, even though for this project size, the Module/Controller/
Service split added ceremony without a corresponding payoff. My
centralized error handler in Express was maybe 15 lines and I fully
understood every line, because I wrote it from scratch. NestJS's
equivalent (built-in exception classes) is genuinely less code, but
some of what it's doing under the hood — how a thrown `HttpException`
gets caught and formatted — I understand less deeply than I understand
my own Express middleware, simply because I didn't write it.

## Which I'd reach for, and when

For a small internal tool, a prototype, or anything one person is
building solo and iterating on fast, I'd reach for Express — the
lower ceremony means I spend my time on the actual logic, not the
framework's conventions. For anything a team is going to maintain
long-term, especially with multiple people adding routes/services
over months, I'd choose NestJS. The enforced separation (Controller
vs Service) that felt like unnecessary structure on a 5-route toy API
is exactly what prevents a larger codebase from turning into one giant
file of mixed HTTP and business logic — which is a real risk with
Express's "just write a function" flexibility once a project grows
past what one person can hold in their head.