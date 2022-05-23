import { UserIdentification } from "./types/queryTypes";
import { UserModel } from "./user.model";
import { hashPassword } from './_helpers/hashPassword'
import { UpdateUserPayload, PrivateUser } from "./user.types";
import { StatusError } from "../core/error.handler";
// import {  createDBConnection } from '../core/db'
// import { omit, update } from "ramda";




export async function getUserById(id: string) {
  try {
    const result = await UserModel.findOne({ _id: id });

    if (!result) {
      return null;
    }

    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function findUser(mail: string) {
  try {
  const result = await UserModel.findOne({ email: mail });

    if (!result) {
      return null;
    }

    return result;
  } catch (err) {
    console.error(err);
  }
}

export const findUserWithoutPass = async (
  where: UserIdentification
): Promise<PrivateUser | null> => {
  const user = await UserModel.findOne(where);

  if (!user) {
    return null;
  }

  return  user;
};

export async function createUser(email: string, password: string) {
  try {
    await UserModel.create({ email, password: hashPassword(password), resetPasswordCode: "" });

    const newUser = await UserModel.findOne({ email });

    return newUser;
  } catch (err) {
    console.error(err);
  }
}

export const deleteUser = async (where: UserIdentification): Promise<boolean | null> => {
  const user = await UserModel.findOne(where);

  if (!user) {
    return null;
  }

  await UserModel.deleteOne(where);

  return true;
};


export const updateUser = async (
  where: UserIdentification,
  data: UpdateUserPayload
): Promise<PrivateUser | undefined> => {
  await UserModel.updateOne({ ...where }, { $set: data });

  const user = await findUserWithoutPass(where);

  if (!user) {
    return undefined;
  }

  return user;
};


export async function getUsers() {
  try {
    const result = await UserModel.find({});

    return result;
  } catch (err) {
    throw new StatusError(404, err.message);
  }
}