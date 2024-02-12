import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note: Note = this.noteRepository.create({
      ...createNoteDto,
      timestamp: new Date(),
    });
    let createdNote: Note;

    try {
      createdNote = await this.noteRepository.save(note);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return createdNote;
  }

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(id);
    const updated: Note = {
      ...note,
      ...updateNoteDto,
      timestamp: new Date(),
    };
    let updatedNote: Note;

    try {
      updatedNote = await this.noteRepository.save(updated);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return updatedNote;
  }

  async remove(id: number): Promise<void> {
    const result = await this.noteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
  }
}
