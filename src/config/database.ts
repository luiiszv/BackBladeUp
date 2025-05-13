import { connect , connection } from "mongoose";

export const connectDb = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("La URI de MongoDB no está definida en el archivo .env");
    }
    await connect(mongoUri);
    console.log("Connected to database", connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};