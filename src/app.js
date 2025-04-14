import express from "express";
import connectDb from "./config/db.js";
import createSuperadmin from "./scripts/create.admin.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(errorMiddleware);

const init = async () => {
  try {
    await connectDb();
    await createSuperadmin();
    app.listen(PORT, () => console.log(`Server is running port ${PORT}`));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
    
init();
