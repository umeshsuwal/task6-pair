# How dependency injection wires NotesService into NotesController

When TypeScript compiles `constructor(private readonly notesService: NotesService)`,
it emits type metadata (via `emitDecoratorMetadata` in `tsconfig.json`)
that records the parameter's type as `NotesService`. NestJS's DI
container reads this metadata at startup, sees that `NotesController`
needs a `NotesService`, and — because `NotesService` is marked
`@Injectable()` and registered in the module's `providers` array —
creates (or reuses) a single instance and passes it into the
constructor automatically. This is constructor injection: you never
write `new NotesService()` yourself; NestJS resolves and supplies the
dependency based on the declared type.