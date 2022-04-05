import { StatusError } from "../core/error.handler";

import { getUserById } from "./user.repository";

export async function getOneById(id: string) {
  const user = await getUserById(id);

  if(!user) {
      throw new StatusError(404, 'User not found!')
  }

  return user;
}
