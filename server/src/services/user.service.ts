// user.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(userData: CreateUserDto): Promise<any> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOneByEmail(email);
    const user1 = await this.userModel.findOne({username: email});
    if (user && password === user.password) {
      return user;
    }else if(user1 && password === user1.password) {
      return user1
    }
    return null;
  }
}
