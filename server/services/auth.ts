import mongoose from "mongoose";
import auth from 'jsonwebtoken';
import * as utils from "@server/utils";
import { UserModel } from "@server/models";
import { jwt } from "@server/config";
import { ServiceType } from "@server/interfaces";

class AuthService {
  private currentUser: any = {};
  private readonly model: mongoose.Model<any>
  private readonly accessOptions = {
    expiresIn: "20m",
  };

  private readonly refreshOptions = {
    expiresIn: "1d",
  };

  constructor() {
    this.model = new UserModel().model;
  }

  /**
   * authenticate the user
   * @param username 
   * @param password 
   * @returns 
   */

  async login(username: string, password: string): Promise<ServiceType> {
    try {
      const user = await this.model.findOne({
        username,
        password,
        deleted: false
      });

      if (user) {
        this.currentUser = user;

        const accessToken = auth.sign({ email: this.currentUser.email }, jwt.access, this.accessOptions);
        const refreshToken = auth.sign({ email: this.currentUser.email }, jwt.refresh, this.refreshOptions);

        return { status: 200, data: { accessToken, refreshToken } } as ServiceType
      } else {
        return { status: 401, data: {} } as ServiceType
      }

    } catch (err: any) {
      return { status: 500 } as ServiceType
    }
  };

  /**
   * the data of the authenticated user to be stored in the session
   * @returns 
   */

  me(): ServiceType {
    delete this.currentUser.username
    delete this.currentUser.password
    return this.currentUser ? {
      status: 200, data: {
        user: this.currentUser,
      }
    } as ServiceType : { status: 401 } as ServiceType
  };

  /**
   * refresh token for the current user
   * @param token access token
   * @returns 
   */

  refresh(token: string): ServiceType {
    try {
      const email: any = auth.decode(token);

      if (email) {
        const isValid: boolean = utils.jwt(email, token);
        if (isValid) {
          const accessToken = auth.sign({ email }, jwt.access, this.accessOptions);
          return { status: 200, data: { accessToken } } as ServiceType
        }
      }

      return { status: 401, data: {} } as ServiceType
    } catch (err) {
      return { status: 500 } as ServiceType
    }
  };
}

export default new AuthService();