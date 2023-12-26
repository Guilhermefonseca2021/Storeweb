import mongoose from "mongoose";
import database from "../config/database";

export default async function connectDatabase() {
  await mongoose.connect(`${database.connect}`);
}
