

export enum Envs {
  PORT = "PORT",
  STAGE = "STAGE",
  JWT_SECRET = "JWT_SECRET",
  DB_NAME = "DB_NAME",
  DB_URL = "DB_URL",
}

// import { StatusError } from "../core/error.handler";

// export const getEnv = (env: Envs): string => {
//   if (!process.env[env] && env !== Envs.DB_URL && env !== Envs.DB_NAME) {
//     const logMessage = `Missing env variable: ${env}`;
//     logger.error(logMessage);
//     throw new StatusError(500, "INTERNAL_ERROR", { logMessage });
//   }

//   return process.env[env] as string;
// };
