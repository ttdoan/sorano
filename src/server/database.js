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
      const dbUri =
        process.env.NODE_ENV === "development"
          ? "mongodb://localhost:27017/soranoDevDb"
          : process.env.MONGODB_URI;

      await mongoose.connect(
        dbUri,
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
      console.log(`Cannot connect with ${process.env.MONGODB_URI}`);
      console.log("Cannot connect to database... Error: " + err);
    });
  }
}
