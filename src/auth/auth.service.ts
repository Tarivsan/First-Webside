import { StatusError } from '../core/error.handler';
import { findUser, createUser } from '../user/user.repository'
// import { sign } from 'jsonwebtoken'
import { compareSync } from "bcryptjs"
import { verify, sign } from "jsonwebtoken"
import { TokenPayload } from "../auth/auth.types"
import { omit } from "ramda";
import { Envs } from "../core/env"; 
import { UserSchema } from 'user/user.model';

type registerUserPayload = {
    email: string, password: string
}

export const collectTokenFromHeader = (headers: any) => {
    const auth = headers.authorization;

    if(!auth) {
        throw new StatusError(401, "Unauthorized")
    }
const splittedToken = auth.split(" ");

if (!splittedToken || splittedToken.lenght !== 2 || splittedToken[0] !== "Bearer") {
throw new StatusError(401, "TOKEN___MALFORMED")
}
return splittedToken[1];
}

export const validateToken = async (token: string) => {
    const verifiedToken = verify(token, Envs.JWT_SECRET) as TokenPayload;

    return verifiedToken.user
}

export const createTokenPayload = (user_: UserSchema) => {
    const payload: TokenPayload = {
        iat: Date.now(),
        user: { ...omit(["password"], user_) },

    };
    return payload
}

export const getToken = (user: UserSchema) => {
    return sign(createTokenPayload(user), Envs.JWT_SECRET);
}

export const getNewToken = async (user: UserSchema) => {
    return {
        token: getToken(user),
        user: omit(["password"], user),
    };
}



export async function registerUser (params: registerUserPayload) {
    const exists = await findUser(params.email);

    if(exists) {
        throw new StatusError(409, "Email Taken!")
    }

    const user = await createUser(params.email, params.password);

    return user;
}

export async function authenticate(email: string, password: string) {
    console.log(email)
    console.log(password);
    
   const user = await findUser(email);
   if(!user) {
    throw new StatusError(400, "Email incorrect")
}
    
    const loginUser = compareSync(password, user.password) 
    console.log(`Is password correct-${loginUser}`)
    return {
        token: getToken(user),
        user: {
             password: undefined,
        }
    }


}
