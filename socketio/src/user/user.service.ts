import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private jwtService: JwtService
  ) { }

  async create(body: { userType: string; name: string; password: string }) {
    const user = await this.UserModel.create(body);
    return user;
  }

  findAll() {
    return this.UserModel.find().exec();
  }

  async findOne(id: string) {
    return await this.UserModel.findById(id).exec();
  }

  async login(data: { userType: string,name: string; password: string }) {
    const user = await this.UserModel.findOne({ userType: data.userType, name: data.name, password: data.password }).exec();

    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Create JWT payload
    const payload = { sub: user._id, name: user.name };

    // Sign JWT token
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      access_token: token,
      message: 'Login Successfull!',
      user: {
        id: user._id,
        name: user.name,
        userType: user.userType
      }
    };
  }

  async update(id: string, updateData: any) {
    return await this.UserModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  remove(id: string) {
    return this.UserModel.findByIdAndDelete(id).exec();
  }
}
