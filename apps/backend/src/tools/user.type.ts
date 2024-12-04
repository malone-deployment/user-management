import { IsString } from 'class-validator';

export class UserInput {
  @IsString()
  userName: string;

  @IsString()
  userEmail: string;

  @IsString()
  age: string;
}
