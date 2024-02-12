import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note/note.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'mysecretpassword',
      username: 'postgres',
      entities: [Note],
      database: 'pgnote',
      synchronize: true,
    }),
    NoteModule,
  ],
})
export class AppModule {}
