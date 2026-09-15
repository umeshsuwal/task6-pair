import { Injectable } from '@nestjs/common';

export interface Note {
  id: number;
  text: string;
  completed: boolean;
}

@Injectable()
export class NotesService {
  private notes: Note[] = [];
  private nextId = 1;

  findAll(): Note[] {
    return this.notes;
  }

  findOne(id: number): Note | undefined {
    return this.notes.find((n) => n.id === id);
  }

  create(text: string, completed = false): Note {
    const note: Note = { id: this.nextId++, text, completed };
    this.notes.push(note);
    return note;
  }

  update(id: number, text: string, completed = false): Note | undefined {
    const index = this.notes.findIndex((n) => n.id === id);
    if (index === -1) return undefined;

    this.notes[index] = { id, text, completed };
    return this.notes[index];
  }

  remove(id: number): Note | undefined {
    const index = this.notes.findIndex((n) => n.id === id);
    if (index === -1) return undefined;

    const [deleted] = this.notes.splice(index, 1);
    return deleted;
  }
}