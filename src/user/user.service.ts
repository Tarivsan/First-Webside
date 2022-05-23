import { StatusError } from "../core/error.handler";
import { getUserById } from "./user.repository";
import { findUser, updateUser, deleteUser, getUsers  } from "./user.repository";
import { clone } from "ramda";
import { hashSync } from "bcryptjs";
import { UserIdentification } from "../user/types/queryTypes";
import { UpdateUserPayload } from "./user.types";

const SALT_ROUNDS = 10;

export async function getOneById(id: string) {
  const user = await getUserById(id);

  if(!user) {
      throw new StatusError(404, 'User not found!')
  }

  return user;
}

export async function getOneByEmail(mail: string) {
  const user = await findUser(mail);

  if(!user) {
      throw new StatusError(404, 'User not found!')
  }

  return user;
}

export const removeU = async (where: UserIdentification) => {
  const deletedUser = await deleteUser(where);

  if (!deletedUser) {
    throw new StatusError(404, 'User not found!');
  }

  return deletedUser;
};



export const updateAcc = async (where: UserIdentification, data: UpdateUserPayload) => {
  const toUpdate = clone(data);

  if (toUpdate.password) {
    toUpdate.password = hashSync(toUpdate.password, SALT_ROUNDS);
  }

  const updatedUser = await updateUser(where, toUpdate);

  if (!updatedUser) {
    throw new StatusError(404, "USER_NOT_FOUND");
  }
  return updatedUser;
}


export async function serviceOfList() {
  const users = await getUsers();
  return users;
}