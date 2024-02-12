import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { Note } from './note.entity';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Note')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Note created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Notes retrieved successfully' })
  findAll(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Note found' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.noteService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Note updated successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    return this.noteService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Note deleted successfully' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.noteService.remove(id);
  }
}
