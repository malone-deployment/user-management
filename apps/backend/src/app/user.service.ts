import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../tools/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInput } from '../tools/user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>
  ) {}

  async postData(userInput: UserInput): Promise<UserEntity> {
    console.log('service');

    const userEntity = new UserEntity();
    userEntity.userName = userInput.userEmail;
    userEntity.userEmail = userInput.userEmail;
    userEntity.age = userInput.age;

    await this.userEntity.save(userEntity);
    return userEntity;
  }

  async getData(): Promise<UserEntity[]> {
    return this.userEntity.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    try {
      const result = await this.userEntity.delete({ id });
      console.log(result);
    } catch (err) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async updateUserInformation(id: string, userInput: UserInput): Promise<void> {
    const foundById = await this.userEntity.findOne({ where: { id } });
    foundById.userName = userInput.userName;
    foundById.userEmail = userInput.userEmail;
    foundById.age = userInput.age;
    await this.userEntity.save(foundById);
  }
}
