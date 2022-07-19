import { StatusError } from "../core/error.handler";
import { findUser, createUser } from "../user/user.repository";
import { compareSync } from "bcryptjs";
import { verify, sign } from "jsonwebtoken";
import { TokenPayload } from "../auth/auth.types";
import { omit } from "ramda";
import { Envs } from "../core/env";
import { UserSchema } from "../user/user.model";
import { getOneByEmail } from "../user/user.service";
import { nanoid } from "nanoid";
import { updateAcc } from "../user/user.service";
import { Buffer } from "buffer";

type registerUserPayload = {
  email: string;
  password: string;
};

export const collectTokenFromHeader = (headers: any) => {
  const auth = headers.authorization;

  if (!auth) {
    throw new StatusError(401, "Unauthorized");
  }
  const splittedToken = auth.split(" ");

  if (
    !splittedToken ||
    splittedToken.length !== 2 ||
    splittedToken[0] !== "Bearer"
  ) {
    throw new StatusError(401, "TOKEN___MALFORMED");
  }
  return splittedToken[1];
};

export const validateToken = async (token: string) => {
  const verifiedToken = verify(token, Envs.JWT_SECRET) as TokenPayload;

  return verifiedToken.user;
};

export const createTokenPayload = (user_: UserSchema) => {
  const payload: TokenPayload = {
    iat: Date.now(),
    user: { ...omit(["password"], user_) },
  };
  return payload;
};

export const getToken = (user: UserSchema) => {
  return sign(createTokenPayload(user), Envs.JWT_SECRET, { expiresIn: "2h" });
};

export const getNewToken = async (user: UserSchema) => {
  return {
    token: getToken(user),
    user: omit(["password"], user),
  };
};

export async function registerUser(params: registerUserPayload) {
  const exists = await findUser(params.email);

  if (exists) {
    throw new StatusError(409, "Email Taken!");
  }

  const user = await createUser(params.email, params.password);

  return user;
}

export async function authenticate(email: string, password: string) {
  console.log(email);
  console.log(password);

  const user = await findUser(email);
  if (!user) {
    throw new StatusError(400, "Email incorrect");
  }

  const loginUser = compareSync(password, user.password);
  console.log(`Is password correct-${loginUser}`);
  return {
    token: getToken(user),
    user: {
      password: undefined,
    },
  };
}

export const sendEmailToResetPassword = async (email: string) => {
  await getOneByEmail(email);
  const resetCodePayLoad = {
    code: nanoid(),
    exp: Date.now() + 24 * 60 * 60 * 1000,
  };
  const resetPasswordCode = Buffer.from(
    JSON.stringify(resetCodePayLoad)
  ).toString("base64");
  console.log(resetPasswordCode);
  await updateAcc({ email }, { resetPasswordCode });
};

export const resetPasswordValues = async (
  email: string,
  code: string,
  newPassword: string
) => {
  const codeString = Buffer.from(code, "base64").toString("ascii");
  const codePayload = JSON.parse(codeString);
  const isExpired = new Date(codePayload.exp).valueOf() < Date.now();

  if (isExpired) {
    console.log("Code expired");
    updateAcc({ email }, { resetPasswordCode: "" });
    throw new StatusError(403, "FORBIDDEN");
  }
  const foundUser = await getOneByEmail(email);
  const isValidCode = foundUser.resetPasswordCode === code;

  if (!isValidCode) {
    console.log(
      `Invalid code - expected: ${foundUser.resetPasswordCode}, got: ${code}`
    );
    updateAcc({ email }, { resetPasswordCode: "" });
    throw new StatusError(403, "FORBIDDEN");
  }

  await updateAcc({ email }, { password: newPassword, resetPasswordCode: "" });
};
