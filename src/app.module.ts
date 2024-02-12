import { Module } from '@nestjs/common';
import { NoteModule } from './modules/note/note.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './modules/note/note.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'mysecretpassword', // of course it should not be here in real app
      username: 'postgres',
      entities: [Note],
      database: 'pgnote',
      synchronize: true,
    }),
    NoteModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
