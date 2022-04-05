import { StatusError } from '../core/error.handler';
import { getUserByEmail, createUser } from '../user/user.repository'

type registerUserPayload = {
    email: string, password: string
}

export async function registerUser (params: registerUserPayload) {
    const exists = await getUserByEmail(params.email);

    if(exists) {
        throw new StatusError(409, "Email Taken!")
    }

    const user = await createUser(params.email, params.password);

    return user;
}

export async function authenticate(email: string, password: string) {
    console.log(email)
    console.log(password)
}