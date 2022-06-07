import { Request, Response } from 'express';
import { AuthService } from "@server/services";

class AuthController {
  async login(res: Response, req: Request) {
    const { username, password } = req.body;
    const response = await AuthService.login(username, password);
    res.status(response.status).json(response.data);
  };

  me(res: Response) {
    const response = AuthService.me();
    res.status(response.status).json(response.data);
  };

  refresh(res: Response, req: Request) {
    const { refreshToken } = req.body;
    const response = AuthService.refresh(refreshToken);
    res.status(response.status).json(response.data);
  };
}

export default new AuthController();