import { StatusError } from '../core/error.handler';
import { findUser, createUser } from '../user/user.repository'
// import { sign } from 'jsonwebtoken'
import { compareSync } from 'bcryptjs'
import { } from "jsonwebtoken"

type registerUserPayload = {
    email: string, password: string
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
    if(user){
    const loginUser = compareSync(password, user.password) 
    console.log(`Is password correct-${loginUser}`)
    return loginUser
}

}
