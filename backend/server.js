import app from "./app.js";
import { dbConnection } from "./config/db.js";

dbConnection();

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});
