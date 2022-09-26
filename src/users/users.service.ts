import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';
import { UserInfo } from './UserInfo';

@Injectable()
export class UsersService {
  constructor(private emailSerivce: EmailService) {}
  async createUser(name: string, email: string, password: string) {
    //여기서는 dto 적용 안 되나?
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private checkUserExists(email: string) {
    return false;
  }

  private saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return;
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailSerivce.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEamil(signupVerifyToken: string): Promise<string> {
    throw new Error('Method not implemented');
  }

  async login(email: string, password: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    throw new Error('Method not implemented.');
  }
}
