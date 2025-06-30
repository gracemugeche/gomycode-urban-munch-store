import app from './app';
import { dbconnect, dbconnect2 } from './db/dbConnect';
import dotenv from 'dotenv';
// Load env vars
dotenv.config();
//variable
const PORT = process.env.PORT || 5000;

//run db connection
// dbconnect()
dbconnect2()

//start app
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

