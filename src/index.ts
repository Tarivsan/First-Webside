require("dotenv").config();

import { createExpressApp } from "./app";
import { createDBConnection } from "./core/db";

const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME;

if (!mongoUrl) {
  throw new Error("Missing DB Url");
}

if (!dbName) {
  throw new Error("Missing DB Name");
}

const bootstrap = async () => {
  const app = createExpressApp();
  try {
    if (await createDBConnection(mongoUrl)) {
      console.log("Database connected!");
    }
    app.listen(port, () =>
      console.log(`Server is listening on port -> ${port}`)
    );
  } catch (err) {
    console.error(err);
  }
};

bootstrap();
