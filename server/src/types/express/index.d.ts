import { IUser } from "../../../models/userModels";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
