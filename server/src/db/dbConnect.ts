import mongoose from 'mongoose';

export async function dbconnect2() {
    try {
        await mongoose.connect (process.env.MONGO_PROD_URI !);
        console.log(`ATLAS_Db connected successfully `);
    } catch (error:any) {
        console.log(`ATLAS_Db connection error => ${error.message}`)
    }
}


