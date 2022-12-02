import mongoose from "mongoose";
import { crypto } from "@/utils";
import { UserModel } from "@/models";
import { ServiceType } from "@/interfaces";

class UserService {
  public readonly model: mongoose.Model<any>;

  constructor() {
    this.model = UserModel.model;
  }

  async get(query: any): Promise<ServiceType> {
    try {
      const response = await this.model.findOne(query).exec();
      return { status: 200, data: this._runDecrypt(response) } as ServiceType;
    } catch (err) {
      return { status: 500 } as ServiceType;
    }
  }

  async add(document: any): Promise<ServiceType> {
    try {
      document = this._runEncrypt(document);
      const response = await this.model.create(document);
      return { status: 200, data: this._runDecrypt(response) } as ServiceType;
    } catch (err) {
      return { status: 500 } as ServiceType;
    }
  }

  async edit(id: string, document: any): Promise<ServiceType> {
    try {
      document = this._runEncrypt(document);
      const response = await this.model
        .findOneAndUpdate({ userdId: id }, document, { useFindAndModify: true, new: true })
        .exec();
      return { status: 200, data: this._runDecrypt(response) } as ServiceType;
    } catch (err) {
      return { status: 500 } as ServiceType;
    }
  }

  _runEncrypt(document: any) {
    if (!document) return document;
    if ("payments" in document) {
      document.payments = document.payments?.map((item: any) => ({
        ...item,
        cvv: null,
        number: crypto.encrypt(item.number),
      }));
    }
    return document;
  }

  _runDecrypt(document: any) {
    if (!document) return document;
    if ("payments" in document) {
      document.payments = document.payments?.map((item: any) => ({
        ...item,
        number: crypto.decrypt(item.number),
      }));
    }
    return document;
  }
}

export default new UserService();
