import mongoose from "mongoose";
import { TokenModel } from "@server/models";
import { UserService } from "@server/services";
import { ServiceType } from "@server/interfaces";

class TokenService {
  public readonly token: TokenModel
  public readonly model: mongoose.Model<any>

  constructor() {
    this.token = new TokenModel();
    this.model = this.token.model;
  }

  /**
   * insert a token checking if there is any other token
   * @param document 
   * @returns 
   */

  async insert(document: any): Promise<ServiceType> {
    let response = null;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { user } = document;
      const tokens: any = await this.token.findMany({ user, done: { $exists: false } });

      tokens.forEach(async item => await this.done(item._id));
      response = await this.model.create(document);

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      return { status: 500 } as ServiceType;
    } finally {
      session.endSession();
    }

    return { status: 200, data: response } as ServiceType;
  }

  /**
   * updates the situation of the token to done
   * @param id token 
   * @returns 
   */

  async done(id: string): Promise<ServiceType> {
    try {
      const response = await this.token.update(id, { done: new Date() });
      return { status: 200, data: response } as ServiceType
    } catch (err) {
      return { status: 500 } as ServiceType
    }
  }

  /**
   * manage the access to the platform when the user is new or when the access is revoked
   * @param id token id 
   * @param state 
   * @returns 
   */

  async access(id: string, state: boolean): Promise<ServiceType> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { data } = await this.done(id);
      const response = await UserService.user.update(data?.user, { validated: state });

      if (response) {
        await session.commitTransaction();
        return { status: 200, data: response } as ServiceType
      } else {
        await session.abortTransaction();
        return { status: 401, data: {} } as ServiceType
      }

    } catch (error) {
      await session.abortTransaction();
      return { status: 500 } as ServiceType
    } finally {
      session.endSession();
    }
  };

  /**
   * set the token used to reset password to done and update the user password
   * @param id token id
   * @param document new password
   * @returns 
   */

  async reset(id: string, document: any): Promise<ServiceType> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { data } = await this.done(id)
      const response = await UserService.user.update(data.user, document);

      if (response) {
        await session.commitTransaction();
        return { status: 200, data: response } as ServiceType
      } else {
        await session.abortTransaction();
        return { status: 401, data: {} } as ServiceType
      }

    } catch (error) {
      await session.abortTransaction();
      return { status: 500 } as ServiceType
    } finally {
      session.endSession();
    }
  };
}

export default new TokenService()