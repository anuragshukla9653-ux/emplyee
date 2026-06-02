import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import seedEmployees from "./seed/seedEmployees.js";

const PORT = process.env.PORT || 5000;

await connectDB();
await seedEmployees();

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
