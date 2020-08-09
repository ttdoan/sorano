import mongoose from "mongoose";

export default class Database {
  constructor() {
    // Singleton instance
    if (Database._db) return Database._db;

    this.username = process.env.DB_USER;
    this.pw = process.env.DB_PW;

    Database._db = this;
  }

  connect() {
    (async () => {
      await mongoose.connect(
        process.env.MONGODB_URI,
        // These are need to suppress DeprecatedWarnings from Mongoose
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      let db = mongoose.connection;
      db.on("error", () => {
        console.error(
          `Cannot connect to database: username = ${this.username}, pw = ${this.pw}`
        );
      });
      db.once("open", () => {
        console.log("Database connected successfully!");
      });
    })().catch((err) => {
      console.log("Cannot connect to database... Error: " + err);
    });
  }
}
