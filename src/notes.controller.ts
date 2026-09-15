import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './create-note.dto';
import { UpdateNoteDto } from './update-note.dto';

@Controller('notes')
export class NotesController {
  // Constructor injection — NestJS reads the TypeScript type metadata
  // for `notesService: NotesService` and automatically creates/reuses
  // an instance and passes it in. No `new NotesService()` anywhere.
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return { data: this.notesService.findAll() };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const note = this.notesService.findOne(Number(id));
    if (!note) {
      throw new NotFoundException(`Note ${id} not found`);
    }
    return { data: note };
  }

  @Post()
  create(@Body() dto: CreateNoteDto) {
    const note = this.notesService.create(dto.text, dto.completed);
    return { data: note };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
    const note = this.notesService.update(Number(id), dto.text, dto.completed);
    if (!note) {
      throw new NotFoundException(`Note ${id} not found`);
    }
    return { data: note };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const deleted = this.notesService.remove(Number(id));
    if (!deleted) {
      throw new NotFoundException(`Note ${id} not found`);
    }
    return { data: deleted };
  }
}