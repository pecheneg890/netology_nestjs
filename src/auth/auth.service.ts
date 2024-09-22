import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { SignupDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(signup: SignupDto) {
    const user = new this.UserModel(signup);

    user.password = await bcrypt.hash(user.password, 5);
    return await user.save();
  }

  async validateUser(username, password) {
    const user = await this.UserModel.findOne({ email: username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user.id, email: user.email, firstName: user.firstName };
    }

    return null;
  }

  async signin(user) {
    const payload = {
      id: user.id, // id пользователя
      email: user.email, // email пользователя
      firstName: user.firstName, // firstName пользователя
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
