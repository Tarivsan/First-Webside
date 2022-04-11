import { UserModel } from "./user.model";
import { hashPassword } from './_helpers/hashPassword'

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

export async function createUser(email: string, password: string) {
  try {
    await UserModel.create({ email, password: hashPassword(password) });

    const newUser = await UserModel.findOne({ email });

    return newUser;
  } catch (err) {
    console.error(err);
  }
}
