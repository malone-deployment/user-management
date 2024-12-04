import {
  Body,
  ConsoleLogger,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../tools/user.entity';
import { UserInput } from '../tools/user.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  postData(@Body() userInput: UserInput): Promise<UserEntity> {
    return this.userService.postData(userInput);
  }

  @Get()
  getData(): Promise<UserEntity[]> {
    return this.userService.getData();
  }

  @Delete()
  deleteById(@Query('id') id: string): Promise<void> {
    return this.userService.deleteById(id);
  }

  @Patch()
  updateUserInformation(@Query('id') id: string, @Body() userInput: UserInput) {
    return this.userService.updateUserInformation(id, userInput);
  }
}
