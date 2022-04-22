import { UserSchema } from "../user/user.model";

export type UserInToken = Omit<UserSchema, "password">;

export type TokenPayload = {
  iat: number;
  exp?: number;
  user: UserInToken;
};
