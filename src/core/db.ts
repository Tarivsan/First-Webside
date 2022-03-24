import { connect } from "mongoose";

const dbUserName = process.env.MONGO_DB_USER_NAME;
const dbUserPassword = process.env.MONGO_DB_USER_PASSWORD;
const dbName = process.env.MONGO_DB_NAME;

export const createDBConnection = (mongoUrl: string): Promise<Boolean> => {
  return new Promise((resolve, reject) => {
    const connectionLink = mongoUrl;

    if (!connectionLink) {
      throw new Error("No connection link");
    }

    connect(connectionLink, {
      auth: {
        username: dbUserName,
        password: dbUserPassword,
      },
      dbName: dbName,
    })
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        console.error(`Error connecting to database! ${err.stack}`);
        reject(false);
      });
  });
};
