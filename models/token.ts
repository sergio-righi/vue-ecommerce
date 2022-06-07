import { TokenType } from "@/interfaces";

export default class TokenModel {
  constructor(params?: TokenType) {
    Object.assign(this, { expires: TokenModel.expireDate() }, params);
  }

  static expireDate() {
    const date = new Date();
    return date.setDate(date.getDate() + 1);
  }
}
