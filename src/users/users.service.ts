import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'entities/users.entity';
import { userInfo } from 'os';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { UserInfo } from './UserInfo';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async createUser(name: string, email: string, password: string) {
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnprocessableEntityException(
        '이미 동일한 이메일로 가입된 회원이 있습니다.',
      );
    }

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
  }

  private async checkUserExists(emailAddress: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { email: emailAddress },
    });
    return user !== null;
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new UserEntity();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.usersRepository.save(user);
  }

  async login(email: string, password: string): Promise<string> {
    const userExist = await this.checkUserExists(email);
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (!userExist) {
      throw new UnprocessableEntityException(
        '회원가입이 되지 않았습니다. 회원가입을 진행해주세요!',
      );
    } else if (user.password !== password) {
      throw new UnprocessableEntityException(
        '비밀번호가 다릅니다. 비밀번호를 확인해주세요!',
      );
    } else return '로그인에 성공하셨습니다!';
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    const user = await this.usersRepository.findOne({
      where: { id: parseInt(userId) },
    });
    const userInfo = { name: user.name, email: user.email };
    return userInfo;
  }
}
