import { StatusError } from "../core/error.handler";

import { getUserById } from "./user.repository";
import { findUser } from "./user.repository";

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

